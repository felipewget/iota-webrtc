import React, {
  useEffect, useGlobal, useState,
} from 'reactn';
import { generateTrytes, getUserMedia } from 'utils';
import { DEFAULT_INTERVAL } from 'utils/constants';
import { createAccount } from '@iota/account';
import { createPersistenceAdapter } from '@iota/persistence-adapter-level';
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
  const [myBalance, setMyBalance] = useState('myBalance');

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

  useEffect(() => {
    const account = createAccount({
      seed,
      provider: tangleNet.URL,
      persistencePath: `${username}`,
      persistenceAdapter: createPersistenceAdapter,
    });
    account.getAvailableBalance().then(res => setMyBalance(res));

    account.on('includedDeposit', ({ address, bundle }) => {
      console.log('Received a new payment');
      account.getAvailableBalance().then(res => setMyBalance(res));
    });

    account.on('pendingDeposit', ({ address, bundle }) => {
      console.log('Receiving a new payment');
      console.log('Address:', address, 'Tail transaction hash:', bundle[0].hash);
    });

    account.on('pendingWithdrawal', ({ address, bundle }) => {
      console.log('Outgoing payment is pending');
      console.log('Address:', address, 'Tail transaction hash:', bundle[0].hash);
    });

    account.on('includedWithdrawal', ({ address, bundle }) => {
      console.log('Outgoing payment confirmed');
      account.getAvailableBalance().then(res => setMyBalance(res));
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

    return () => {
      communication.endMonitoring();
    };
  }, []);

  return (
    <div>
      <div>{`My Balance: ${myBalance}`}</div>
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
