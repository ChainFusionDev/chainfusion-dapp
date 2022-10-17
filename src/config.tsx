import chainConfig from '@data/chain-config.json';

interface ChainConfig {
  chainfusion: Chain;
  chains: Chain[];
  tokens: Token[];
}

export interface Chain {
  identifier: string;
  name: string;
  rpc: string;
  explorer: string;
}

export interface Token {
  identifier: string;
  symbol: string;
  name: string;
}

const config: ChainConfig = chainConfig;

const chainMap: { [identifier: string]: Chain } = {};
for (const chain of config.chains) {
  chainMap[chain.identifier] = chain;
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

export function getToken(identifier: string): Token {
  return tokenMap[identifier];
}
