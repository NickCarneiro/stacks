import {
    makeContractCall,
    broadcastTransaction,
    bufferCVFromString,
    uintCV, tupleCV, standardPrincipalCV
} from '@stacks/transactions';
import {StacksMainnet } from '@stacks/network';

const network = new StacksMainnet();

const principalAddress = 'XXXXXX'
const stacker = standardPrincipalCV(principalAddress);
const amountUstx = uintCV('XXX')
const poxAddress = tupleCV({
    'hashBytes': bufferCVFromString('XXXXX'),
    'version': bufferCVFromString('1')
})
const startBurnHt = uintCV('XXX')
const lockPeriod = uintCV('XXX')

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
    senderKey: 'XXXX',
    validateWithAbi: true,
    network
};

const transaction = await makeContractCall(txOptions);

const transactionResponse = await broadcastTransaction(transaction, network);
console.log(transactionResponse)