import { TangleNet, ICE_SERVERS } from 'utils/constants';
import React from 'react';

export const initialState = {
  username: '',
  userHash: '',
  loggedIn: false,
  seed: null,
  myId: null,
  tangleNet: TangleNet.DEV_NET1,
  iceServers: ICE_SERVERS,
  accountData: null,
  monitoringInterval: 3000,
  myAccount: null,
  provider: TangleNet.DEV_NET1.URL,
  myBalance: 0,
};

export const DBContext = React.createContext();
