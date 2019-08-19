import React, {
  useGlobal, useEffect, getGlobal, setGlobal, useState,
} from 'reactn';
import { TAG_LENGTH, SEED_LENGTH } from 'utils/constants';
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
  const [availableBalance, setAvailableBalance] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [faucetAddr, setFaucetAddr] = useState('faucetAddr');

  const updateBalance = debounce((account) => {
    account.getTotalBalance().then((res) => {
      setTotalBalance(res);
    });
    account.getAvailableBalance().then((res) => {
      setAvailableBalance(res);
    });
  }, 1000);


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
    updateBalance(account);
    account.startAttaching({
      depth: 3,
      minWeightMagnitude: 9,
      delay: 5000,
      maxDepth: 6,
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

    account.generateCDA({
      timeoutAt: Date.now() + 24 * 60 * 60 * 1000,
    }).then(res => setFaucetAddr(res.address));

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
      <div>{`My Available Balance: ${availableBalance}`}</div>
      <div>{`My Total Balance: ${totalBalance}`}</div>
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
