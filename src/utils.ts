import { BridgeTransfer, Chain } from '@src/types';
import { BigNumber, BytesLike, utils } from 'ethers';
import { getTokenByChainIdentifierAndAddress } from './config';

export const getAddressLink = (chain: Chain, address: string): string => {
  return new URL(`/address/${address}`, chain.explorer).href;
};

export const getTransactionLink = (chain: Chain, txHash: string): string => {
  return new URL(`/tx/${txHash}`, chain.explorer).href;
};

export const decodeSendEventData = (data: BytesLike): BytesLike | undefined => {
  try {
    const decodeResult = utils.defaultAbiCoder.decode(['bytes'], data);

    return decodeResult[0];
  } catch (e) {
    return undefined;
  }
};

export const decodeBridgeTransfer = (
  hash: string,
  fromChain: Chain,
  toChain: Chain,
  data: BytesLike
): BridgeTransfer | undefined => {
  try {
    const result = utils.defaultAbiCoder.decode(
      ['uint256', 'address', 'address', 'uint256', 'address', 'uint256', 'uint256'],
      data
    );

    const token = getTokenByChainIdentifierAndAddress(fromChain.identifier, result[2] as string);
    if (token === undefined) {
      return undefined;
    }

    return {
      hash: hash,
      sender: result[1] as string,
      receiver: result[4] as string,
      fromChain: fromChain,
      toChain: toChain,
      token: token,
      amount: result[5] as BigNumber,
      fee: result[6] as BigNumber,
    };
  } catch (e) {
    return undefined;
  }
};
