import chainConfig from '@config/config.json';
import { Chain, NativeContracts, Token } from '@src/types';

interface ChainConfig {
  nativeChain: Chain;
  nativeContracts: NativeContracts;
  chains: Chain[];
  tokens: Token[];
}

const config: ChainConfig = chainConfig;

const chainMap: { [identifier: string]: Chain } = {};
for (const chain of config.chains) {
  chainMap[chain.identifier] = chain;
}

const chainByIdMap: { [id: string]: Chain } = {};
for (const chain of config.chains) {
  chainByIdMap[chain.chainId] = chain;
}

const tokenMap: { [identifier: string]: Token } = {};
for (const token of config.tokens) {
  tokenMap[token.identifier] = token;
}

const tokenByChainAndAddressMap: { [address: string]: Token | undefined } = {};
for (const token of config.tokens) {
  for (const [chainIdentifier, address] of Object.entries(token.chains)) {
    tokenByChainAndAddressMap[`${chainIdentifier}-${address}`] = token;
  }
}

export function getNativeChain(): Chain {
  return config.nativeChain;
}

export function getNativeContracts(): NativeContracts {
  return config.nativeContracts;
}

export function getSupportedChains(): Chain[] {
  return config.chains;
}

export function getSupportedTokens(): Token[] {
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

export function getTokenByChainIdentifierAndAddress(chainIdentifier: string, address: string): Token | undefined {
  return tokenByChainAndAddressMap[`${chainIdentifier}-${address}`];
}

export function getChainParams(chain: Chain) {
  return {
    chainId: chain.chainId.toString(16),
    chainName: chain.name,
    nativeCurrency: chain.nativeCurrency,
    rpcUrls: [chain.rpc],
    blockExplorerUrls: [chain.explorer],
  };
}
