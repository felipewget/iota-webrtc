import { asTransactionObject, asTransactionTrytes } from '@iota/transaction-converter';
import { init, pow } from 'curl.lib.js';

/**
 *  Local proof-of-work by obany:
 *  https://gist.github.com/obany/c4065b33bfe78932a485010f5029979b
 */
const localPow = async (trunkTransaction, branchTransaction, minWeightMagnitude, trytes) => {
  console.log(trunkTransaction);
  console.log('LOCAL PROOF OF WORK');
  const finalTrytes = [];
  init();

  let previousTransactionHash;

  for (let i = 0; i < trytes.length; i += 1) {
    // Start with last index transaction
    // Assign it the trunk / branch which the user has supplied
    // If there is a bundle, chain the bundle transactions via
    // trunkTransaction together
    const tx = { ...asTransactionObject(trytes[i]) };

    tx.attachmentTimestamp = Date.now();
    tx.attachmentTimestampLowerBound = 0;
    tx.attachmentTimestampUpperBound = (Math.pow(3, 27) - 1) / 2;

    // If this is the first transaction, to be processed
    // Make sure that it's the last in the bundle and then
    // assign it the supplied trunk and branch transactions

    if (!previousTransactionHash) {
      // Check if last transaction in the bundle
      if (tx.lastIndex !== tx.currentIndex) {
        throw new Error(
          'Wrong bundle order. The bundle should be ordered in descending order from currentIndex',
        );
      }
      tx.trunkTransaction = trunkTransaction;
      tx.branchTransaction = branchTransaction;
    } else {
      tx.trunkTransaction = previousTransactionHash;
      tx.branchTransaction = trunkTransaction;
    }

    const newTrytes = asTransactionTrytes(tx);

    const nonce = await pow({ trytes: newTrytes, minWeight: minWeightMagnitude });
    const returnedTrytes = newTrytes.substr(0, newTrytes.length - nonce.length).concat(nonce);

    // Calculate the hash of the new transaction with nonce
    // and use that as the previous hash for next entry
    const returnTransaction = asTransactionObject(returnedTrytes);
    previousTransactionHash = returnTransaction.hash;

    finalTrytes.push(returnedTrytes);
  }

  return finalTrytes.reverse();
};

export default localPow;
