import React, {
  useEffect, useGlobal, useState,
} from 'reactn';
import { generateTrytes, getUserMedia } from 'utils';
import { DEFAULT_INTERVAL } from 'utils/constants';
import Communication from './Communication';

window.genTryte = generateTrytes;

export default function Chatroom({ match: { params: { roomId } } }) {
  console.log('Chatroom called');
  const [username] = useGlobal('username');
  const [myId] = useGlobal('myId');
  const [tangleNet] = useGlobal('tangleNet');
  const [iceServers] = useGlobal('iceServers');
  const [seed] = useGlobal('seed');
  const [peers, setPeers] = useState([]);
  const [streams, setStreams] = useState([]);
  const [peerCounter, setPeerCounter] = useState(0);
  const [communication, setCommunication] = useState(null);

  const peerVideoRefs = {};

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

  const sendMessage = () => communication.broadcastMessage(' A NEW MESSAGE');

  const stopMonitoring = () => communication.stopMonitoring();

  const endMonitoring = () => communication.endMonitoring();

  const startMonitoring = () => communication.startMonitoring();

  const setPeerVideoRefs = (ref, id, stream) => {
    if (ref) {
      try {
        peerVideoRefs[id] = ref;
        ref.srcObject = stream;
      } catch (err) {
        console.log('error');
      }
    }
  };

  useEffect(() => {
    /* eslint-disable-next-line no-shadow */
    const communication = new Communication(config);
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

    return () => console.log('unmounted');
  }, []);

  return (
    <div>
      <div>{`Room ID: ${roomId}`}</div>
      <button type="button" onClick={sendMessage}>Send a message</button>
      <button type="button" onClick={stopMonitoring}>Stop monitoring</button>
      <button type="button" onClick={endMonitoring}>End Peer connection</button>
      <button type="button" onClick={startMonitoring}>Start Monitoring</button>
      <div>{peerCounter}</div>
      {streams.map(stream => (
        <div key={stream.id}>
          <div />
          <video
            autoPlay
            style={{ width: '250px', height: '250px' }}
            ref={ref => setPeerVideoRefs(ref, stream.id, stream.stream)}
          >
            <track kind="captions" srcLang="en" label={stream.username} />
          </video>
        </div>
      ))}
    </div>
  );
}
