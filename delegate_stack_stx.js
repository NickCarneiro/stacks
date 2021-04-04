import {
    makeContractCall,
    broadcastTransaction,
    bufferCVFromString,
    uintCV, tupleCV, standardPrincipalCV, bufferCV
} from '@stacks/transactions';
import btc from 'bitcoinjs-lib';
import {StacksMainnet } from '@stacks/network';
import BN from "bn.js";

const network = new StacksMainnet();

const principalAddress = 'SPQ0J759DPCZKS9CVJHKVDCB86GMDFWRTNM1GKGB' // the STX address of the delegator
const stacker = standardPrincipalCV(principalAddress);
const amountUstx = uintCV('447608000000') // number of microstacks to lock
const btcHashString = btc.address.fromBase58Check('16W6L8V68GVczYWGexTPRA4bCB2Y6KJEGM').hash
console.log(btcHashString)
const poxAddress = tupleCV({
    'hashbytes': bufferCV(btcHashString),  // the reward Bitcoin address of the delegator
    'version': bufferCV(new BN(0, 10).toArrayLike(Buffer))
})
const startBurnHt = uintCV('678550') // the burnchain block height to begin lock
const lockPeriod = uintCV('10') // number of cycles to lock

const txOptions = {
    contractAddress: 'SP000000000000000000002Q6VF78',
    contractName: 'pox',
    functionName: 'delegate-stack-stx',
    functionArgs: [
        stacker,
        amountUstx,
        poxAddress,
        startBurnHt,
        lockPeriod
    ],
    senderKey: '', // private key to sign transaction
    validateWithAbi: true,
    network
};

const transaction = await makeContractCall(txOptions);

const transactionResponse = await broadcastTransaction(transaction, network);
console.log(transactionResponse)