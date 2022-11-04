import '@styles/reset.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css';
import '@styles/global.css';
import '@styles/responsive.css';
import '@styles/fontawesome.css';
import '@styles/fonts.css';

import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { Web3ReactProvider } from '@web3-react/core';
import { getConnectors } from '@src/connectors/connectors';

function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <Web3ReactProvider connectors={getConnectors()}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default App;
