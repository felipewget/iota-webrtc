import React, {
  useGlobal, useEffect, getGlobal, setGlobal, useState,
} from 'reactn';
import { composeAPI } from '@iota/core';
import { TangleNet, TAG_LENGTH } from 'utils/constants';
import { generateTrytes } from 'utils';
import { initialState } from 'store';
import { isTrytes } from '@iota/validators';

export default function Account({ history }) {
  const [seed] = useGlobal('seed');
  const [accountData, setAccountData] = useGlobal('accountData');
  const [, setLoggedIn] = useGlobal('loggedIn');
  const [roomId, setRoomId] = useState('');
  useEffect(() => {
    const iota = composeAPI({
      provider: TangleNet.DEV_NET1.URL,
    });
    iota.getAccountData(seed).then((res) => {
      console.log(res);
      setAccountData(res);
    });
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
        {`Your seed: ${seed}`}
      </div>
      <div>
        {`Your account data: ${accountData}`}
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
