import React, {
  useEffect, useGlobal, useState,
} from 'reactn';
import { generateTrytes, getUserMedia } from 'utils';
import { DEFAULT_INTERVAL } from 'utils/constants';
import { createAccount } from '@iota/account';
import { createPersistenceAdapter } from '@iota/persistence-adapter-level';
import { debounce } from 'debounce';
import Communication from './Communication';
import Peer from './Peer';

window.genTryte = generateTrytes;

export default function Chatroom({ match: { params: { roomId } }, history }) {
  const [username] = useGlobal('username');
  const [myId] = useGlobal('myId');
  const [tangleNet] = useGlobal('tangleNet');
  const [iceServers] = useGlobal('iceServers');
  const [seed] = useGlobal('seed');
  const [myAccount] = useGlobal('myAccount');
  const [peers, setPeers] = useState([]);
  const [streams, setStreams] = useState([]);
  const [peerCounter, setPeerCounter] = useState(0);
  const [communication, setCommunication] = useState(null);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const config = {
    username,
    seed,
    myId,
    roomId,
    minWeight: tangleNet.MWM,
    iceServers,
    interval: DEFAULT_INTERVAL,
    provider: tangleNet.URL,
    account: myAccount,
  };

  const returnHome = () => history.push('/');

  const broadcastMessage = () => communication.broadcastMessage(' A NEW MESSAGE');

  const sentDonationOffer = (id) => {
    console.log(myAccount);
    console.log('chatroom send donation');
    communication.sendDonationOffer(id);
  };

  const stopMonitoring = () => communication.stopMonitoring();

  const endMonitoring = () => communication.endMonitoring();

  const startMonitoring = () => communication.startMonitoring();

  const updateBalance = debounce((account) => {
    account.getTotalBalance().then((res) => {
      setTotalBalance(res);
    });
    account.getAvailableBalance().then((res) => {
      setAvailableBalance(res);
    });
  }, 1000);

  useEffect(() => {
    const account = createAccount({
      seed,
      provider: tangleNet.URL,
      persistencePath: `${username}`,
      persistenceAdapter: createPersistenceAdapter,
    });

    account.on('pendingDeposit', ({ address, bundle }) => {
      console.log('Incoming payment is pending');
      updateBalance(account);
    });

    account.on('pendingWithdrawal', ({ address, bundle }) => {
      console.log('Outgoing payment is pending');
      updateBalance(account);
    });

    account.on('includedDeposit', ({ address, bundle }) => {
      console.log('Incoming payment confirmed');
      updateBalance(account);
    });

    account.on('includedWithdrawal', ({ address, bundle }) => {
      console.log('Outgoing payment confirmed');
      updateBalance(account);
    });

    updateBalance(account);

    account.startAttaching({
      depth: 3,
      minWeightMagnitude: 9,
      delay: 5000,
      maxDepth: 6,
    });

    /* eslint-disable-next-line no-shadow */
    const communication = new Communication({ ...config, account });
    setCommunication(communication);

    communication.startMonitoring();

    communication.on('connect', (peer) => {
      setPeers(prevState => [...prevState, peer]);
      setPeerCounter(prevState => prevState + 1);
    });

    communication.on('stream', (peerStream) => {
      setStreams(prevState => [...prevState, peerStream]);
    });

    communication.on('close', (peer) => {
      setStreams(prevState => prevState.filter(stream => stream.id !== peer.id));
      setPeerCounter(prevState => prevState - 1);
    });
    window.onbeforeunload = function () {
      communication.endMonitoring();
    };
    return () => {
      window.onbeforeunload = undefined;
      communication.endMonitoring();
    };
  }, []);

  return (
    <div>
      <div>{`My Available Balance: ${availableBalance}`}</div>
      <div>{`My Total Balance: ${totalBalance}`}</div>
      <div>{`Room ID: ${roomId}`}</div>
      <button type="button" onClick={returnHome}>Return home</button>
      <button type="button" onClick={stopMonitoring}>Stop monitoring</button>
      <button type="button" onClick={endMonitoring}>End Peer connection</button>
      <button type="button" onClick={startMonitoring}>Start Monitoring</button>
      <div>{peerCounter}</div>
      {streams.map(stream => (
        <Peer
          id={stream.id}
          key={stream.id}
          username={stream.username}
          srcObject={stream.srcObject}
          sendDonationOffer={() => sentDonationOffer(stream.id)}
        />
      ))}
    </div>
  );
}
