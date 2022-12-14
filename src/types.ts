import { BigNumber } from 'ethers';

export enum WalletType {
  METAMASK,
  COINBASE_WALLET,
  WALLET_CONNECT,
}

export interface NativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

export interface NativeContracts {
  staking: string;
  eventRegistry: string;
}

export interface Chain {
  chainId: number;
  identifier: string;
  name: string;
  rpc: string;
  explorer: string;
  nativeCurrency: NativeCurrency;
  erc20BridgeAddress?: string;
}

export interface ChainToAddress {
  [identifier: string]: string | undefined;
}

export interface Token {
  identifier: string;
  name: string;
  symbol: string;
  decimals: number;
  chains: ChainToAddress;
}

export interface ValidatorInfo {
  validator: string;
  stake: BigNumber;
  status: number;
}

export interface StakingInfo {
  validator: string;
  stake: BigNumber;
  status: number;
  withdrawalAmount: BigNumber;
  withdrawalTime: BigNumber;
}

export interface BridgeTransfer {
  hash: string;
  sender: string;
  receiver: string;
  fromChain: Chain;
  toChain: Chain;
  token: Token;
  amount: BigNumber;
  fee: BigNumber;
}
