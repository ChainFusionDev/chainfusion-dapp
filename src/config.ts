import chainConfig from '@data/chain-config.json';

interface ChainConfig {
  chainfusion: Chain;
  chains: Chain[];
  tokens: Token[];
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
  [identifier: string]: string;
}

export interface Token {
  identifier: string;
  name: string;
  symbol: string;
  decimals: number;
  chains: ChainToAddress;
}

const config: ChainConfig = chainConfig;

const chainMap: { [identifier: string]: Chain } = {};
for (const chain of config.chains) {
  chainMap[chain.identifier] = chain;
}

const chainByIdMap: { [identifier: string]: Chain } = {};
for (const chain of config.chains) {
  chainByIdMap[chain.chainId] = chain;
}

const tokenMap: { [identifier: string]: Token } = {};
for (const token of config.tokens) {
  tokenMap[token.identifier] = token;
}

export function chainfusionChain(): Chain {
  return config.chainfusion;
}

export function supportedChains(): Chain[] {
  return config.chains;
}

export function supportedTokens(): Token[] {
  return config.tokens;
}

export function getChain(identifier: string): Chain {
  return chainMap[identifier];
}

export function getChainById(chainId: number): Chain {
  return chainByIdMap[chainId];
}

export function getToken(identifier: string): Token {
  return tokenMap[identifier];
}
