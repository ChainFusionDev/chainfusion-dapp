import chainConfig from '@data/chain-config.json';

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

interface ChainConfig {
  chainfusion: Chain;
  chains: Chain[];
  tokens: Token[];
}

const config: ChainConfig = chainConfig;

export function chainfusionChain(): Chain {
  return config.chainfusion;
}

export function supportedTokens(): Token[] {
  return config.tokens;
}

export function supportedChains(): Chain[] {
  return config.chains;
}
