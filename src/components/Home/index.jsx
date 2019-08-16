import React, {
  useGlobal, useEffect, getGlobal, setGlobal, useState,
} from 'reactn';
import { TAG_LENGTH } from 'utils/constants';
import { generateTrytes } from 'utils';
import { initialState } from 'store';
import { isTrytes } from '@iota/validators';
import { createAccount } from '@iota/account';
import { createPersistenceAdapter } from '@iota/persistence-adapter-level';

const addAccountEventHandlers = () => {};

export default function Account({ history }) {
  const [seed] = useGlobal('seed');
  const [provider] = useGlobal('provider');
  const [username] = useGlobal('username');
  // const [myAccount, setMyAccount] = useGlobal('myAccount');
  const [, setLoggedIn] = useGlobal('loggedIn');
  const [roomId, setRoomId] = useState('');
  const [myBalance, setMyBalance] = useState('myBalance');

  useEffect(() => {
    const account = createAccount({
      seed,
      provider,
      persistencePath: `${username}`,
      persistenceAdapter: createPersistenceAdapter,
    });
    account.getAvailableBalance().then(res => setMyBalance(res));

    account.on('includedDeposit', ({ address, bundle }) => {
      account.getAvailableBalance().then(res => setMyBalance(res));
    });

    addAccountEventHandlers(account);
    account.start();
    account.getAvailableBalance().then(balance => setMyBalance(balance));
    return () => {
      account.stop();
      account.removeAllListeners();
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
      <div>
        {`My balance: ${myBalance}`}
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
