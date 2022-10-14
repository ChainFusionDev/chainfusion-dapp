import Link from "next/link";
import Image from "next/image";
import React from "react";
import ConnectWalletModal from "./Modals/ConnectWalletModal";

const Navbar = () => {
  const [showConnectWalletModal, setShowConnectWalletModal] = React.useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbarMenu">
      <div className="container-fluid">
        <div className="logo-mobile" style={{ position: "relative", height: 87, width: 87 }}>
          <Link className=" d-none" href="/">
            <Image
              src="/img/icon.svg"
              alt="ChainFusion Logo"
              className="img-fluid"
              layout="fill"
            />
          </Link>
        </div>
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
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarMenu"
        >
          <ul className="navbar-nav mr-auto w-100">
            <li className="nav-item"></li>
          </ul>
          <ul className="navbar-nav w-100 justify-content-center">
            <li className="nav-item active">
              <Link href="/">
                <a className="nav-link">Bridge</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="">
                <a className="nav-link">Staking</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="">
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
              <span
                className="nav-link connect-wallet-btn"
                onClick={() => setShowConnectWalletModal(true)}
              >
                <i className="fa-regular fa-wallet"></i> Connect Wallet
              </span>
            </li>
          </ul>
        </div>
      </div>

      <ConnectWalletModal isShow={showConnectWalletModal} close={() => setShowConnectWalletModal(false)} />
    </nav>
  );
};

export default Navbar;
