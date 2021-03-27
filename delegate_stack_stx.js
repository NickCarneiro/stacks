import {
    makeContractCall,
    broadcastTransaction,
    bufferCVFromString,
    uintCV, tupleCV, standardPrincipalCV
} from '@stacks/transactions';
import {StacksMainnet } from '@stacks/network';

const network = new StacksMainnet();

const principalAddress = 'XXXXXX' // the STX address of the delegator
const stacker = standardPrincipalCV(principalAddress);
const amountUstx = uintCV('XXX') // number of microstacks to lock
const poxAddress = tupleCV({
    'hashBytes': bufferCVFromString('XXXXX'),  // the reward Bitcoin address of the delegator
    'version': bufferCVFromString('1')
})
const startBurnHt = uintCV('XXX') // the burnchain block height to begin lock
const lockPeriod = uintCV('XXX') // number of cycles to lock

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
    senderKey: 'XXXX', // private key to sign transaction
    validateWithAbi: true,
    network
};

const transaction = await makeContractCall(txOptions);

const transactionResponse = await broadcastTransaction(transaction, network);
console.log(transactionResponse)