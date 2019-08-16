import CryptoJS from 'crypto-js';
import B64ToArrBuff from 'base64-arraybuffer';
import LZUTF8 from 'lzutf8';
import { extractJson } from '@iota/extract-json';
import { asciiToTrytes } from '@iota/converter';
import { TRYTES_CHARSET_REGEX, SEED_LENGTH } from './constants';

export function generateTrytes(maxLength) {
  let seed = '';
  if (window && window.crypto && window.crypto.getRandomValues) {
    while (seed.length < maxLength) {
      seed += B64ToArrBuff
        .encode(window.crypto.getRandomValues(new Uint32Array(maxLength)))
        .replace(TRYTES_CHARSET_REGEX, '');
    }
  } else {
    return console.error('No native crypto random available');
  }
  return seed.substring(0, maxLength);
}

function compressData(data) {
  return LZUTF8.compress(data, { outputEncoding: 'Base64' });
}

function decompressData(data) {
  return LZUTF8.decompress(data, { inputEncoding: 'Base64' });
}

export function parseJsonFromBundle(bundle) {
  let result;
  try {
    result = JSON.parse(extractJson(bundle));
  } catch (err) {
    console.log(err);
    console.log(bundle);
  }
  return result;
}

export const getCurrentTimestamp = () => Math.floor(new Date().getTime() / 1000);

export const getUserHash = (username, password) => {
  const hash = CryptoJS.SHA1(username + password);
  return hash.toString();
};

export const getUserMedia = async (constraints) => {
  if (navigator
    && navigator.mediaDevices
    && navigator.mediaDevices.getUserMedia) {
    return navigator.mediaDevices.getUserMedia(constraints);
  }
  return new Error('User Media Not Supported!');
};

export const extractData = (bundle) => {
  const dataJSON = parseJsonFromBundle(bundle);
  return JSON.parse(decompressData(dataJSON));
};

export const prepareData = (data, tag) => {
  const compressedData = compressData(JSON.stringify(data));
  const message = asciiToTrytes(JSON.stringify(compressedData));
  return [{
    address: generateTrytes(SEED_LENGTH),
    tag,
    value: 0,
    message,
  }];
};
