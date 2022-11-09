import React from 'react';
import { Modal, ModalBody, ModalTitle } from '@components/Modal';
import {
  coinbaseWallet,
  coinbaseWalletHooks,
  metaMask,
  metaMaskHooks,
  walletConnect,
  walletConnectHooks,
} from '@src/connectors/connectors';
import { Chain, WalletType } from '@src/types';
import { getChainParams } from '@src/config';
import { Connector } from '@web3-react/types';

interface ConnectWalletModalProps {
  show: boolean;
  desiredChain: Chain | undefined;
  close: () => void;
}

const ConnectWalletModal = ({ show, desiredChain, close }: ConnectWalletModalProps) => {
  const isMetamaskActive = metaMaskHooks.useIsActive();
  const isCoinbaseActive = coinbaseWalletHooks.useIsActive();
  const isWalletConnectActive = walletConnectHooks.useIsActive();

  const selectWallet = async (walletType: WalletType) => {
    let connector: Connector | undefined = undefined;
    switch (walletType) {
      case WalletType.METAMASK:
        connector = metaMask;
        break;
      case WalletType.COINBASE_WALLET:
        connector = coinbaseWallet;
        break;
      case WalletType.WALLET_CONNECT:
        connector = walletConnect;
        break;
    }

    if (connector !== undefined) {
      if (desiredChain !== undefined) {
        await connector.activate(getChainParams(desiredChain));
      } else {
        await connector.activate();
      }
    }
    close();
  };

  return (
    <Modal show={show} size="sm" onHide={close}>
      <ModalTitle close={close}>Connect a wallet</ModalTitle>
      <ModalBody>
        <ul className="wallet-list">
          <li onClick={() => selectWallet(WalletType.METAMASK)}>
            <img src="/img/wallet/metamask.svg" alt="MetaMask Logo" /> MetaMask{' '}
            {isMetamaskActive && <i className="fa-regular fa-check"></i>}
          </li>
          <li onClick={() => selectWallet(WalletType.COINBASE_WALLET)}>
            <img src="/img/wallet/coinbase.svg" alt="Coinbase Wallet Logo" /> Coinbase Wallet{' '}
            {isCoinbaseActive && <i className="fa-regular fa-check"></i>}
          </li>
          <li onClick={() => selectWallet(WalletType.WALLET_CONNECT)}>
            <img src="/img/wallet/walletconnect.svg" alt="Wallet Connect Logo" /> Wallet Connect{' '}
            {isWalletConnectActive && <i className="fa-regular fa-check"></i>}
          </li>
        </ul>
      </ModalBody>
    </Modal>
  );
};

export default ConnectWalletModal;
