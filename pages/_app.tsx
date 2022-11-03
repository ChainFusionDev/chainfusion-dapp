import '@styles/reset.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css';
import '@styles/global.css';
import '@styles/responsive.css';
import '@styles/fontawesome.css';
import '@styles/fonts.css';

import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { getConnectors, Web3ContextProvider } from '@src/context/Web3ContextProvider';

function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <Web3ReactProvider connectors={getConnectors()}>
      <Web3ContextProvider>
        <Component {...pageProps} />
      </Web3ContextProvider>
    </Web3ReactProvider>
  );
}

export default App;
