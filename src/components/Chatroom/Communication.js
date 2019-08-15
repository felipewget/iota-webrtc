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

export default class Communication extends Events {
  constructor({
    seed, username, myId, roomId, minWeight, iceServers, interval, provider,
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
  }

  static Type = {
    WEBRTCSIGNAL: 'WEBRTCSIGNAL',
    REQUEST: 'REQUEST',
  }
  peerList = {};
  monitorInterval = null;
  oldTransactions = {};
  requestList = {};

  startMonitoring = async () => {
    const constraint = { video: true, audio: true };
    this.stream = await getUserMedia(constraint);
    clearInterval(this.monitorInterval);
    this.currentTimestamp = getCurrentTimestamp();
    try {
      this.broadcastRequest();
      this.monitorInterval = setInterval(this.monitorRequest, this.interval);
    } catch (err) {
      clearInterval(this.monitorInterval);
      console.error(err);
    }
  }

  broadcastRequest = async () => {
    const request = {
      id: this.myId,
      username: this.myUsername,
      type: Communication.Type.REQUEST,
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

  getSignals = bundles => bundles.map(bundle => extractData(bundle, this.roomId))
    .filter(({ type, id }) => !(type === Communication.Type.REQUEST && id === this.myId))

  startOffering = (signal) => {
    this.requestList[signal.id] = signal;
    for (const id in this.requestList) {
      if (!this.peerList[id]) {
        const { username } = this.requestList[id];
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
        case Communication.Type.REQUEST:
          this.startOffering(signal);
          break;
        case Communication.Type.WEBRTCSIGNAL:
          this.startAnswering(id, peerId, username, data);
          break;
        default:
          console.log('Unknown signal type');
      }
    }
  }

  broadcastMessage(message) {
    for (const peerId of Object.keys(this.peerList)) {
      if (this.peerList[peerId].connected) {
        this.peerList[peerId].send(message);
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
        username,
        type: Communication.Type.WEBRTCSIGNAL,
        peerId: this.myId,
        data: [...signalQueue],
      };

      sendAllSignals({ signalData, signalQueue });
      this.emit('signal', { ...identity, signalQueue });
    });

    peer.on('data', (data) => {
      this.emit('data', { ...identity, data: data.toString() });
    });

    peer.on('stream', (stream) => {
      this.emit('stream', { ...identity, stream });
    });

    peer.on('track', (track, stream) => {
      this.emit('track', { ...identity, track, stream });
    });

    peer.on('connect', () => {
      this.emit('connect', identity);
    });

    peer.on('close', () => {
      this.emit('close', identity);
      peer.destroy();
      delete this.peerList[id];
      delete this.requestList[id];
    });

    peer.on('error', (error) => {
      // this.emit('error', { ...identity, error });
      console.log(error);
    });
  }

  stopMonitoring = () => {
    clearInterval(this.monitorInterval);
  }

  endMonitoring() {
    clearInterval(this.monitorInterval);
    for (const id of Object.keys(this.peerList)) {
      this.peerList[id].destroy();
    }
    this.peerList = {};
    this.requestList = {};
  }
}
