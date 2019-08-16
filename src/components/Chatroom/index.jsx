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
    account.getTotalBalance().then(balance => setMyBalance(balance));

    account.on('includedDeposit', debounce(async ({ address, bundle }) => {
      console.log('Incoming payment confirmed');
      const newBalance = await account.getTotalBalance();
      setMyBalance(newBalance);
    }), 1000);

    account.on('includedWithdrawal', debounce(async ({ address, bundle }) => {
      console.log('Outgoing payment confirmed');
      const newBalance = await account.getTotalBalance();
      setMyBalance(newBalance);
    }), 1000);

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
