import { Chain } from '@src/types';

export const getAddressLink = (chain: Chain, address: string): string => {
  return new URL(`/address/${address}`, chain.explorer).href;
};

export const getTransactionLink = (chain: Chain, txHash: string): string => {
  return new URL(`/tx/${txHash}`, chain.explorer).href;
};
