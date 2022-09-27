import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import '../styles/responsive.css'
import '../styles/fontawesome/css/all.min.css'
import 'animate.css';


import type { AppProps } from 'next/app'
import { useEffect } from 'react'

function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
  }, []);
  return <Component {...pageProps} />
}

export default App
