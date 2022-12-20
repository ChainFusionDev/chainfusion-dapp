import { BridgeTransfer, Chain } from '@src/types';
import { BigNumber, BigNumberish, BytesLike, utils } from 'ethers';
import { getTokenByChainIdentifierAndAddress } from './config';

export const oneEther = utils.parseEther('1');
export const nullAddress = '0x0000000000000000000000000000000000000000';

export const getAddressLink = (chain: Chain, address: string): string => {
  return new URL(`/address/${address}`, chain.explorer).href;
};

export const getTransactionLink = (chain: Chain, txHash: string): string => {
  return new URL(`/tx/${txHash}`, chain.explorer).href;
};

export const trimDecimals = (value: BigNumber, decimals: number, showDecimals: number) => {
  return value.sub(value.mod(BigNumber.from(10).pow(decimals - showDecimals)));
};

export const decodeSendEventData = (data: BytesLike): BytesLike | undefined => {
  try {
    const decodeResult = utils.defaultAbiCoder.decode(['bytes'], data);

    return decodeResult[0];
  } catch (e) {
    return undefined;
  }
};

export const parseUnits = (value: string, unitName?: BigNumberish): BigNumber => {
  try {
    return utils.parseUnits(value, unitName);
  } catch (e) {
    return BigNumber.from(0);
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
      ['uint256', 'address', 'address', 'address', 'uint256', 'uint256'],
      data
    );

    const token = getTokenByChainIdentifierAndAddress(fromChain.identifier, result[2] as string);
    if (token === undefined) {
      return undefined;
    }

    return {
      hash: hash,
      sender: result[1] as string,
      receiver: result[3] as string,
      fromChain: fromChain,
      toChain: toChain,
      token: token,
      amount: result[4] as BigNumber,
      fee: result[5] as BigNumber,
    };
  } catch (e) {
    return undefined;
  }
};
