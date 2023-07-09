import { type AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <CookiesProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </CookiesProvider>
  );
}

export default App;
