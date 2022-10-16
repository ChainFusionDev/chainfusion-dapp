import Link from 'next/link';
import React from 'react';
import ConnectWalletModal from './Modals/ConnectWalletModal';

type NavbarProps = {
  module: string;
};

const Navbar = ({ module }: NavbarProps) => {
  const [showConnectWalletModal, setShowConnectWalletModal] = React.useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbarMenu">
      <div className="container-fluid">
        <Link href="/">
          <a className="logo-nav">
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
            <li className={`nav-item ${module === 'bridge' ? 'active' : ''}`}>
              <Link href="/">
                <a className="nav-link">Bridge</a>
              </Link>
            </li>
            <li className={`nav-item ${module === 'staking' ? 'active' : ''}`}>
              <Link href="/staking">
                <a className="nav-link">Staking</a>
              </Link>
            </li>
            <li className={`nav-item ${module === 'slashing' ? 'active' : ''}`}>
              <Link href="/slashing">
                <a className="nav-link">Slashing</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="">
                <a className="nav-link">Liquidity</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="">
                <a className="nav-link">Apps</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="">
                <a className="nav-link">Analytics</a>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto w-100 justify-content-end">
            <li className="nav-item">
              <span className="nav-link connect-wallet-btn" onClick={() => setShowConnectWalletModal(true)}>
                <i className="fa-regular fa-wallet"></i> Connect Wallet
              </span>
            </li>
          </ul>
        </div>
      </div>

      <ConnectWalletModal show={showConnectWalletModal} close={() => setShowConnectWalletModal(false)} />
    </nav>
  );
};

export default Navbar;
