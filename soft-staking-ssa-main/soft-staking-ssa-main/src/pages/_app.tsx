import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from '../styles/global';
import { theme } from '../styles/theme';

require('@solana/wallet-adapter-react-ui/styles.css');

Modal.setAppElement('#modal-portal');

const WalletConnectionProvider = dynamic(
  () => import('../providers/WalletConnectionProvider'),
  {
    ssr: false
  }
);

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <WalletConnectionProvider>
          <GlobalStyles />
          <Component {...pageProps} />
          <Toaster position="top-right" />
        </WalletConnectionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
