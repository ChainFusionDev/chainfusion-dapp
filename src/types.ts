export enum WalletType {
  METAMASK,
  COINBASE_WALLET,
  WALLET_CONNECT,
}

export interface Token {
  name: string;
  img: string;
}

export interface Blockchain {
  name: string;
  img: string;
}

export interface Fee {
  token: Token;
  amount: number;
}
