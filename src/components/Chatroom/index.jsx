import React, {
  useEffect, useGlobal, useState,
} from 'reactn';
import { generateTrytes, getUserMedia } from 'utils';
import { DEFAULT_INTERVAL } from 'utils/constants';
import Communication from './Communication';
import Peer from './Peer';

window.genTryte = generateTrytes;

export default function Chatroom({ match: { params: { roomId } }, history }) {
  const [username] = useGlobal('username');
  const [myId] = useGlobal('myId');
  const [tangleNet] = useGlobal('tangleNet');
  const [iceServers] = useGlobal('iceServers');
  const [seed] = useGlobal('seed');
  const [peers, setPeers] = useState([]);
  const [streams, setStreams] = useState([]);
  const [peerCounter, setPeerCounter] = useState(0);
  const [communication, setCommunication] = useState(null);
  const [myBalance, setMyBalance] = useState(0);
  const config = {
    username,
    seed,
    myId,
    roomId,
    minWeight: tangleNet.MWM,
    iceServers,
    interval: DEFAULT_INTERVAL,
    provider: tangleNet.URL,
  };

  const returnHome = () => history.push('/');

  const sentDonationOffer = (id) => {
    console.log('chatroom send donation');
    communication.sendDonationOffer(id);
  };

  const stopMonitoring = () => communication.stopMonitoring();

  const endMonitoring = () => communication.endMonitoring();

  const startMonitoring = () => communication.startMonitoring();

  const refreshAccount = ({ balance }) => {
    console.log(balance);
    console.log(myBalance);
    setMyBalance(balance);
  };

  useEffect(() => {
    /* eslint-disable-next-line no-shadow */

    const communication = new Communication(config);
    setCommunication(communication);

    communication.startMonitoring();

    communication.on('connect', (peer) => {
      setPeers(prevState => [...prevState, peer]);
      setPeerCounter(peers.length);
    });

    communication.on('stream', (peerStream) => {
      setStreams(prevState => [...prevState, peerStream]);
    });

    communication.on('close', (peer) => {
      setStreams(prevState => prevState.filter(stream => stream.id !== peer.id));
      setPeerCounter(peers.length);
    });

    communication.on('refreshAccount', (account) => {
      refreshAccount(account);
    });

    window.onbeforeunload = function () {
      communication.endMonitoring();
    };
    return () => {
      console.log('Chatroom closed');
      window.onbeforeunload = undefined;
      communication.endMonitoring();
      communication.stopRefreshingAccount();
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
