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

export interface Fee {
  token: Token;
  amount: number;
}

export interface TransactionHistoryFee {
  token: string;
  amount: number;
}

export interface TransactionHistoryItem {
  from: {
    chain: string;
    token: string;
    amount: number;
  };
  to: {
    chain: string;
    token: string;
    amount: number;
  };
  sender: string;
  receiver: string;
  validatorFee: number;
  liquidityFee: number;
  status: string;
}
