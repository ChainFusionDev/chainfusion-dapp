/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Ethereum {
  isCoinbaseWallet?: boolean;
  isCoinbaseBrowser?: boolean;
  isMetaMask?: boolean;
  isStatus?: boolean;
  host?: string;
  path?: string;
  providers?: Ethereum[];
  sendAsync: (request: { method: string; params?: any[] }, callback: (error: any, response: any) => void) => void;
  send: (request: { method: string; params?: any[] }, callback: (error: any, response: any) => void) => void;
  request: (request: { method: string; params?: {} }) => Promise<any>;
  on: (request: string, callback: (...args: any[]) => void) => void;
  setSelectedProvider: (provider: typeof window.ethereum) => void;
}

export interface Window {
  web3: import('web3').default;
  ethereum: Ethereum;
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
