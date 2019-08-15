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
  monitoringInterval: 2000,
};

export const DBContext = React.createContext();
