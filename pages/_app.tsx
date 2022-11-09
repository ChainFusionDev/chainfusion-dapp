import '@styles/reset.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css';
import '@styles/global.css';
import '@styles/responsive.css';
import '@styles/fontawesome.css';
import '@styles/fonts.css';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { store } from '@store/index';
import { Web3ReactProvider } from '@web3-react/core';
import { getConnectors } from '@src/connectors/connectors';
import { ChainContextProvider } from '@src/context/ChainContext';

function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <Provider store={store}>
      <Web3ReactProvider connectors={getConnectors()}>
        <ChainContextProvider>
          <Component {...pageProps} />
        </ChainContextProvider>
      </Web3ReactProvider>
    </Provider>
  );
}

export default App;
