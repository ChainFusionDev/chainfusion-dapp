import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { initializeConnector, Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Connector } from '@web3-react/types';
import { WalletConnect } from '@web3-react/walletconnect';

export const [metaMask, metaMaskHooks] = initializeConnector<MetaMask>((actions) => new MetaMask({ actions }));

export const [coinbaseWallet, coinbaseWalletHooks] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet({ actions, options: { appName: 'ChainFusion Bridge', url: 'https://rpc.chainfusion.org' } })
);

export const [walletConnect, walletConnectHooks] = initializeConnector<WalletConnect>(
  (actions) => new WalletConnect({ actions, options: { rpc: 'https://rpc.chainfusion.org' } })
);

export const getConnectors = (): [Connector, Web3ReactHooks][] => {
  return [
    [metaMask, metaMaskHooks],
    [coinbaseWallet, coinbaseWalletHooks],
    [walletConnect, walletConnectHooks],
  ];
};
