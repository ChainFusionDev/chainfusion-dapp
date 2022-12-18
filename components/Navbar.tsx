import { useChainContext } from '@src/context/ChainContext';
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { useWeb3React } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Connector } from '@web3-react/types';
import { WalletConnect } from '@web3-react/walletconnect';
import Link from 'next/link';

type NavbarProps = {
  module: string;
};

const Navbar = ({ module }: NavbarProps) => {
  const { connector, isActive } = useWeb3React();
  const { showConnectWalletDialog } = useChainContext();

  const getConnectorName = (connector: Connector): string => {
    if (connector instanceof MetaMask) return 'MetaMask';
    if (connector instanceof WalletConnect) return 'WalletConnect';
    if (connector instanceof CoinbaseWallet) return 'Coinbase Wallet';
    return 'Unknown';
  };

  const getConnectorLogo = (connector: Connector): string => {
    if (connector instanceof MetaMask) return '/img/wallet/metamask.svg';
    if (connector instanceof CoinbaseWallet) return '/img/wallet/coinbase.svg';
    if (connector instanceof WalletConnect) return '/img/wallet/walletconnect.svg';
    return 'Unknown';
  };

  return (
    <nav className="navbar navbar-expand-lg navbarMenu">
      <div className="container-fluid">
        <Link href="/">
          <a className={`logo-nav ${module === 'bridge' && 'd-none'}`}>
            <img src="/img/logo.svg" alt="ChainFusion Logo" className="img-fluid" />
          </a>
        </Link>
        <button
          className="navbar-toggler collapsed ml-auto"
          type="button"
          data-toggle="collapse"
          data-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarMenu">
          <ul className="navbar-nav mr-auto w-100">
            <li className="nav-item"></li>
          </ul>
          <ul className="navbar-nav w-100 justify-content-center">
            <li className={`nav-item ${module === 'bridge' && 'active'}`}>
              <Link href="/">
                <a className="nav-link">Bridge</a>
              </Link>
            </li>
            <li className={`nav-item ${module === 'liquidity' && 'active'}`}>
              <Link href="/liquidity">
                <a className="nav-link">Liquidity</a>
              </Link>
            </li>
            <li className={`nav-item ${module === 'staking' && 'active'}`}>
              <Link href="/staking">
                <a className="nav-link">Staking</a>
              </Link>
            </li>
            <li className={`nav-item ${module === 'slashing' && 'active'}`}>
              <Link href="/slashing">
                <a className="nav-link">Slashing</a>
              </Link>
            </li>
            {/* <li className={`nav-item ${module === 'analytics' && 'active'}`}>
              <Link href="/analytics">
                <a className="nav-link">Analytics</a>
              </Link>
            </li> */}
          </ul>
          <ul className="navbar-nav ml-auto w-100 justify-content-end">
            <li className="nav-item">
              <span className="nav-link connect-wallet-btn" onClick={() => showConnectWalletDialog()}>
                {isActive ? (
                  <span className="connected-wallet-btn">
                    <span className="connected-wallet-icon">
                      <img src={`${getConnectorLogo(connector)}`} alt={`${getConnectorName(connector)} Logo`} />
                    </span>{' '}
                    Connected
                  </span>
                ) : (
                  <span>
                    <i className="fa-regular fa-wallet"></i> Connect Wallet
                  </span>
                )}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
