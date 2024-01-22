import {
  WalletModalProvider,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

function Connect() {
  return (
    <WalletModalProvider>
      <WalletMultiButton style={{ borderRadius: 25 }} />
    </WalletModalProvider>
  );
}

export { Connect };
