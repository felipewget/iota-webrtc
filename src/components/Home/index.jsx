import React, {
  useGlobal, useEffect, getGlobal, setGlobal, useState,
} from 'reactn';
import { TAG_LENGTH, SEED_LENGTH } from 'utils/constants';
import { generateTrytes } from 'utils';
import { initialState } from 'store';
import { isTrytes } from '@iota/validators';
import { composeAPI } from '@iota/core';

export default function Account({ history }) {
  console.log('home rendered');
  const [seed] = useGlobal('seed');
  const [provider] = useGlobal('provider');
  const [username] = useGlobal('username');
  const [myBalance, setMyBalance] = useState(0);
  const [, setLoggedIn] = useGlobal('loggedIn');
  const [roomId, setRoomId] = useState('');
  const [faucetAddr, setFaucetAddr] = useState('');

  const refreshAccount = (res) => {
    console.log('refreshed account');
    console.log(res);
    setMyBalance(res.balance);
    setFaucetAddr(res.latestAddress);
  };

  useEffect(() => {
    const API = composeAPI({
      provider,
    });

    API.getAccountData(seed, { security: 2 })
      .then(res => refreshAccount(res));

    const interval = setInterval(() => API.getAccountData(seed, { security: 2 })
      .then(res => refreshAccount(res)), 20000);

    return () => {
      console.log('Home closed');
      clearInterval(interval);
    };
  }, []);

  function logout() {
    localStorage.removeItem('userData');
    setLoggedIn(false);
    setGlobal(initialState);
    console.log(getGlobal());
  }

  function createChatroom() {
    const newRoomId = generateTrytes(TAG_LENGTH);
    history.push(`chatroom/${newRoomId}`);
  }

  function joinChatroom() {
    if (isTrytes(roomId, TAG_LENGTH)) {
      history.push(`chatroom/${roomId}`);
    }
  }

  return (
    <div>
      <div>
        {`My seed: ${seed}`}
      </div>
      <div>{`My username: ${username}`}</div>
      <div>{`My Balance: ${myBalance}`}</div>
      <div>
        {`Use this address to request for devnet tokens: ${faucetAddr}`}
      </div>
      <div>
        <a
          target="_blank"
          href="https://faucet.devnet.iota.org"
          rel="noopener noreferrer"
        >
      Open devnet faucet link in new tab
        </a>
      </div>
      <button type="button" onClick={createChatroom}>
        Create chatroom
      </button>
      <button type="button" onClick={joinChatroom}>
        Join chatroom
      </button>
      <input type="text" onChange={e => setRoomId(e.target.value)} value={roomId} />
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
