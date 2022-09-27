import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbarMenu">
      <div className="container-fluid">
        <Link className="logo-mobile d-none" href="/">
          <img src="/img/icon.svg" className="img-fluid" />
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
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarMenu"
        >
          <ul className="navbar-nav mr-auto w-100">
            <li className="nav-item"></li>
          </ul>
          <ul className="navbar-nav w-100 justify-content-center">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Bridge
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Staking
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Slashing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Liquidity
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Apps
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Analytics
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto w-100 justify-content-end">
            <li className="nav-item">
              <a
                className="nav-link connect-wallet-btn"
                href="#"
                data-toggle="modal"
                data-target="#modalConnectwallet"
              >
                <i className="fa-regular fa-wallet"></i> Connect Wallet
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
