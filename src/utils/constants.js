/**
 * Iota constants
 */
export const TRYTES_CHARSET_REGEX = /[^A-Z9]+/g;
export const SEED_LENGTH = 81;
export const TAG_LENGTH = 27;
export const MAX_DEPTH = 4;
export const DEFAULT_INTERVAL = 3000;
export const ICE_SERVERS = [{
  urls: 'stun:global.stun.twilio.com:3478?transport=udp',
}, {
  urls: 'stun:stun1.l.google.com:19302',
}, {
  urls: 'stun:stun2.l.google.com:19302',
}, {
  urls: 'stun:stun.l.google.com:19302',
}, {
  urls: 'stun:stun.vodafone.ro:3478',
}, {
  urls: 'stun:stun.xs4all.nl:3478',
}];

export const TangleNet = {
  SPAM_NET: {
    URL: 'https://nodes.spamnet.iota.org:443',
    MWM: 7,
  },
  DEV_NET1: {
    URL: 'https://nodes.devnet.iota.org:443',
    MWM: 9,
  },
  DEV_NET2: {
    URL: 'https://nodes.devnet.thetangle.org:443',
    MWM: 9,
  },
};

export const Routes = {
  HOME: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  CHATROOM: '/chatroom/:roomId',
  CHATGUI: '/chatgui',
};

export const Color = {
  PRIMARY: '#33B3A6',
  BACKGROUND: '#607D8B',
};
