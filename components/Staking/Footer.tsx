export const Footer = () => {
  return (
    <footer className="d-flex mt-auto align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-12 footer-block d-flex">
            <div className="copyright d-flex justify-content-start align-items-center">
              ChainFusion © {new Date().getFullYear()}
            </div>
            <ul className="footer-link d-flex justify-content-between mr-auto">
              <li>
                <a href="https://chainfusion.org">Home</a>
              </li>
              <li>
                <a href="https://explorer.chainfusion.org">Explorer</a>
              </li>
              <li>
                <a href="https://docs.chainfusion.org">Documentation</a>
              </li>
              <li>
                <a href="#">Data Privacy</a>
              </li>
            </ul>
            <ul className="footer-social-icon d-flex ml-auto">
              <li>
                <a href="https://twitter.com/chain_fusion" target="_blank" rel="noreferrer">
                  <img src="img/social/twitter.svg" alt="Twitter" />
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noreferrer">
                  <img src="img/social/telegram.svg" alt="Telegram" />
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noreferrer">
                  <img src="img/social/medium.svg" alt="Medium" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/chainfusion" target="_blank" rel="noreferrer">
                  <img src="img/social/linkedin.svg" alt="Linkedin" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
