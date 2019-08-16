import React, {
  useGlobal, useEffect, getGlobal, setGlobal, useState,
} from 'reactn';
import { TAG_LENGTH } from 'utils/constants';
import { generateTrytes } from 'utils';
import { initialState } from 'store';
import { isTrytes } from '@iota/validators';
import { createAccount } from '@iota/account';
import { createPersistenceAdapter } from '@iota/persistence-adapter-level';
import { composeAPI } from '@iota/core';
import { debounce } from 'debounce';

const addAccountEventHandlers = () => {};

export default function Account({ history }) {
  const [seed] = useGlobal('seed');
  const [provider] = useGlobal('provider');
  const [username] = useGlobal('username');
  // const [myAccount, setMyAccount] = useGlobal('myAccount');
  const [, setLoggedIn] = useGlobal('loggedIn');
  const [roomId, setRoomId] = useState('');
  const [myBalance, setMyBalance] = useState('myBalance');
  const [faucetAddr, setFaucetAddr] = useState('faucetAddr');

  useEffect(() => {
    const iota = composeAPI({
      provider,
    });
    iota.getAccountData(seed).then(res => console.log(res));
    const account = createAccount({
      seed,
      provider,
      persistencePath: `${username}`,
      persistenceAdapter: createPersistenceAdapter,
    });
    account.getAvailableBalance().then(balance => setMyBalance(balance));
    account.startAttaching({
      depth: 3,
      minWeightMagnitude: 9,
      delay: 5000,
      maxDepth: 6,
    });

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

    account.generateCDA({
      timeoutAt: Date.now() + 24 * 60 * 60 * 1000,
    }).then(res => setFaucetAddr(res.address.substr(0, 81)));

    addAccountEventHandlers(account);
    return () => {
      account.stopAttaching();
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
    const newRoomId = generateTrytes(81);
    history.push(`chatroom/${newRoomId}`);
  }

  function joinChatroom() {
    if (isTrytes(roomId, 81)) {
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
