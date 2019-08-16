import React from 'react';

export default function Peer(props) {
  const {
    username, id, srcObject, sendDonationOffer,
  } = props;

  const setPeerVideoRef = (ref) => {
    if (ref) {
      try {
        ref.srcObject = srcObject;
      } catch (err) {
        console.log('error');
      }
    }
  };

  return (
    <div className="peer">
      <video
        className="peer__video"
        autoPlay
        ref={ref => setPeerVideoRef(ref)}
        width={300}
        height={300}
      >
        <track kind="captions" srcLang="en" label={username} />
      </video>
      <div className="peer__username">{`User: ${username}`}</div>
      <button
        type="button"
        className="peer__donate"
        onClick={sendDonationOffer}
      >
        Send message
      </button>
    </div>
  );
}
