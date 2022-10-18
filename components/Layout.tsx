import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';

type LayoutProps = {
  children: React.ReactNode;
  module: string;
  title: string;
  description: string;
};

function Layout({ children, module, title, description }: LayoutProps) {
  const finalTitle = `ChainFusion | ${title}`;
  return (
    <div className="page">
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{finalTitle}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/img/favicon.svg" sizes="any" type="image/svg+xml" />
      </Head>

      <main className="d-flex flex-column h-100">
        <Navbar module={module} />
        {children}

        <footer className="d-flex mt-auto align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-12 footer-block d-flex">
                <div className="copyright d-flex justify-content-start align-items-center">
                  ChainFusion © {new Date().getFullYear()}
                </div>
                <ul className="footer-link d-flex justify-content-between mr-auto">
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">Blockchain explorer</a>
                  </li>
                  <li>
                    <a href="#">Documentation</a>
                  </li>
                  <li>
                    <a href="#">Data privacy</a>
                  </li>
                </ul>
                <ul className="footer-social-icon d-flex ml-auto">
                  <li>
                    <a href="#" target="_blank">
                      <img src="img/social/twitter.svg" alt="Twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <img src="img/social/telegram.svg" alt="Telegram" />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <img src="img/social/medium.svg" alt="Medium" />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <img src="img/social/linkedin.svg" alt="Linkedin" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Layout;
