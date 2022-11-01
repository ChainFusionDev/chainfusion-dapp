import '@styles/reset.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css';
import '@styles/global.css';
import '@styles/responsive.css';
import '@styles/fontawesome.css';
import '@styles/fonts.css';

import { initializeConnector, Web3ReactHooks, Web3ReactProvider } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import type { Connector } from '@web3-react/types';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

export const [metaMask, metaMaskHooks] = initializeConnector<MetaMask>((actions) => new MetaMask({ actions }));

const connectors: [Connector, Web3ReactHooks][] = [[metaMask, metaMaskHooks]];

function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <Web3ReactProvider connectors={connectors}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default App;
