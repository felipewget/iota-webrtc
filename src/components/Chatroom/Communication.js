import Events from 'events';
import Peer from 'simple-peer';
import uuidv4 from 'uuid/v4';
import {
  getCurrentTimestamp,
  prepareData,
  extractData,
  getUserMedia,
} from 'utils';
import { MAX_DEPTH } from 'utils/constants';
import { debounce } from 'debounce';
import { composeAPI } from '@iota/core';
import { serializeCDAMagnet, parseCDAMagnet } from '@iota/cda';


export default class Communication extends Events {
  constructor({
    seed, username, myId, roomId, minWeight, iceServers, interval, provider, account,
  }) {
    super();
    this.seed = seed;
    this.myUsername = username;
    this.myId = uuidv4();
    // this.myId = myId;
    this.roomId = roomId;
    this.minWeight = minWeight;
    this.interval = interval;
    this.config = { iceServers };
    this.iota = composeAPI({ provider });
    this.account = account;
  }

  type = {
    WEBRTCSIGNAL: 'WEBRTCSIGNAL',
    REQUEST: 'REQUEST',
    DONATE_OFFER: 'DONATE_OFFER',
    DONATE_ACCEPT: 'DONATE_ACCEPT',
    CHAT_MESSAGE: 'CHAT_MESSAGE',
  }
  peerList = {};
  monitorInterval = null;
  oldTransactions = {};
  requestList = {};

  startMonitoring = async () => {
    clearInterval(this.monitorInterval);
    const constraint = { video: true, audio: true };
    this.stream = await getUserMedia(constraint);
    this.currentTimestamp = getCurrentTimestamp();
    try {
      this.broadcastRequest();
      this.monitorInterval = setInterval(this.monitorRequest, this.interval);
    } catch (err) {
      clearInterval(this.monitorInterval);
      console.error(err);
    }
  }

  sendMessage(peerId, message) {
    const peer = this.peerList[peerId];
    if (peer && peer.connected) {
      peer.send(message);
    }
  }

  sendDonationOffer = (peerId) => {
    const message = {
      type: this.type.DONATE_OFFER,
    };
    this.sendMessage(peerId, JSON.stringify(message));
  }

  broadcastMessage(message) {
    for (const peerId of Object.keys(this.peerList)) {
      if (this.peerList[peerId].connected) {
        this.peerList[peerId].send(message);
      }
    }
  }

  broadcastRequest = () => {
    const request = {
      id: this.myId,
      username: this.myUsername,
      type: this.type.REQUEST,
    };
    this.broadcastTransaction(request);
  }

  broadcastTransaction = (data) => {
    const message = prepareData(data, this.roomId);
    this.iota.prepareTransfers(this.seed, message).then(async (trytes) => {
      this.iota.sendTrytes(trytes, MAX_DEPTH, this.minWeight);
    });
  }

  monitorRequest = async () => {
    try {
      const transactions = await this.getNewTransactions();
      const bundles = this.getBundles(transactions);
      const signals = this.getSignals(bundles);
      console.log('New signals from Tangle:');
      console.log(signals);
      this.processSignals(signals);
    } catch (error) {
      console.error(error);
    }
  }

  getNewTransactions = async () => {
    const searchValues = { tags: [this.roomId] };
    const transactions = await this.iota.findTransactionObjects(searchValues);
    return transactions.filter((transaction) => {
      const { timestamp, bundle } = transaction;
      return timestamp > this.currentTimestamp
          && !this.oldTransactions[bundle];
    });
  }

  getBundles = (transactions) => {
    const bundleMap = {};
    const bundleList = [];
    for (const transaction of transactions) {
      const { bundle } = transaction;
      this.oldTransactions[bundle] = true;
      if (!bundleMap[bundle]) {
        bundleMap[bundle] = [];
      }
      bundleMap[bundle].push(transaction);
    }
    for (const key in bundleMap) {
      bundleList.push(bundleMap[key]);
    }
    return bundleList
      .map(bundle => bundle
        .sort((a, b) => (a.currentIndex > b.currentIndex ? 1 : -1)));
  }

  getSignals = bundles => bundles.reduce((signals, bundle) => {
    const extractedSignal = extractData(bundle);
    const { type, id } = extractedSignal;
    if (!(type === this.type.REQUEST && id === this.myId)) {
      signals.push(extractedSignal);
    }
    return signals;
  }, [])

  // getSignals = bundles => bundles.map(bundle => extractData(bundle))
  //   .filter(({ type, id }) => !(type === this.type.REQUEST && id === this.myId))

  startOffering = ({ id, username }) => {
    if (!this.peerList[id]) {
      const { stream, config } = this;
      const peer = this.createPeer({
        initiator: true,
        stream,
        id,
        config,
      });
      this.attachEventHandlers(peer, id, username);
    }
  }

  startAnswering = (id, peerId, username, data) => {
    if (id === this.myId) {
      if (!this.peerList[peerId]) {
        console.log('started connector');
        const { config, stream } = this;
        const peer = this.createPeer({
          initiator: false,
          stream,
          id: peerId,
          config,
        });
        this.attachEventHandlers(peer, peerId, username);
      }
      for (const signalData of data) {
        this.peerList[peerId].signal(signalData);
      }
    }
  }

  processSignals = (signals) => {
    for (const signal of signals) {
      const {
        type, id, peerId, username, data,
      } = signal;
      switch (type) {
        case this.type.REQUEST:
          this.startOffering(signal);
          break;
        case this.type.WEBRTCSIGNAL:
          this.startAnswering(id, peerId, username, data);
          break;
        default:
          console.log('Unknown signal');
      }
    }
  }

  createPeer = ({
    initiator, stream, id, config,
  }) => {
    const peer = new Peer({
      initiator,
      stream,
      config,
      trickle: true,
    });
    return this.peerList[id] = peer;
  }

  attachEventHandlers = (peer, id, username) => {
    const sendAllSignals = debounce(({ signalData, signalQueue }) => {
      this.broadcastTransaction(signalData);
      signalQueue.length = 0;
    }, 1000);

    const identity = { id, username };
    const signalQueue = [];

    peer.on('signal', (data) => {
      signalQueue.push(data);
      const signalData = {
        id,
        username: this.myUsername,
        type: this.type.WEBRTCSIGNAL,
        peerId: this.myId,
        data: [...signalQueue],
      };

      sendAllSignals({ signalData, signalQueue });
      this.emit('signal', { ...identity, signalQueue });
    });

    peer.on('data', async (data) => {
      let message = data.toString();
      message = JSON.parse(message);
      switch (message.type) {
        case this.type.CHAT_MESSAGE: {
          this.emit('chatmessage', { ...identity, message });
          break;
        }
        case this.type.DONATE_OFFER: {
          const cda = await this.account.generateCDA({
            timeoutAt: Date.now() + 24 * 60 * 60 * 1000,
            expectedAmount: 1,
          });
          const magnetLink = serializeCDAMagnet(cda);
          const response = {
            type: this.type.DONATE_ACCEPT,
            data: magnetLink,
          };
          peer.send(JSON.stringify(response));
          break;
        }
        case this.type.DONATE_ACCEPT: {
          const CDAdata = parseCDAMagnet(message.data);
          const {
            address, timeoutAt, multiUse, expectedAmount,
          } = CDAdata;
          this.account.sendToCDA({
            address,
            timeoutAt,
            multiUse,
            expectedAmount,
            value: 1,
          })
            .catch((err) => {
              console.log(err);
            });
          break;
        }
        default:
      }
      this.emit('data', { ...identity, data: data.toString() });
    });

    peer.on('stream', (stream) => {
      this.emit('stream', { ...identity, srcObject: stream });
    });

    peer.on('track', (track, stream) => {
      console.log('track');
      this.emit('track', { ...identity, track, stream });
    });

    peer.on('connect', () => {
      this.emit('connect', identity);
    });

    peer.on('close', () => {
      console.log('close');
      this.emit('close', identity);
      peer.destroy();
      delete this.peerList[id];
    });

    peer.on('error', (error) => {
      console.log('error');
      // this.emit('error', { ...identity, error });
    });
  }

  stopStreaming = () => {
    if (this.stream) {
      const trackList = this.stream.getTracks();
      for (const track of trackList) {
        track.stop();
      }
    }
  }

  stopMonitoring = () => {
    clearInterval(this.monitorInterval);
  }

  endMonitoring = () => {
    this.stopStreaming();
    clearInterval(this.monitorInterval);
    for (const id of Object.keys(this.peerList)) {
      this.peerList[id].destroy();
    }
    this.peerList = {};
  }
}
