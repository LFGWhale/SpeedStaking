import { Connection, clusterApiUrl } from '@solana/web3.js';

const mainNet = new Connection(clusterApiUrl('mainnet-beta'));

const genesysRpc = new Connection(
  'https://small-red-dew.solana-mainnet.quiknode.pro/a7a53c5e116e9196170c3ee6ddc1a150dd64cf9b/',
  'confirmed'
);

export { mainNet, genesysRpc };
