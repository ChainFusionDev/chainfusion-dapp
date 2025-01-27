import '@styles/reset.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css';
import '@styles/global.css';
import '@styles/responsive.css';
import '@styles/skeleton.css';
import '@styles/fontawesome.css';
import '@styles/fonts.css';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { store } from '@store/index';
import { Web3ReactProvider } from '@web3-react/core';
import { getConnectors } from '@src/connectors/connectors';
import { ChainContextProvider } from '@src/context/ChainContext';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <Web3ReactProvider connectors={getConnectors()}>
      <ChainContextProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ChainContextProvider>
    </Web3ReactProvider>
  );
}

export default App;
