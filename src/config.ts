import chainConfig from '@data/chain-config.json';
import history from '@data/transaction-history.json';
import { Chain, Token, TransactionHistoryItem } from '@src/types';

interface ChainConfig {
  chainfusion: Chain;
  chains: Chain[];
  tokens: Token[];
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

export function transactionHistory(): TransactionHistoryItem[] {
  return history;
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
