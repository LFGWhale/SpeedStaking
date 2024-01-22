/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const withTM = require('next-transpile-modules')([
  '@solana/wallet-adapter-base',
  '@solana/wallet-adapter-react',
  '@solana/wallet-adapter-react-ui',
  '@solana/wallet-adapter-wallets'
]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  webpack5: true,
  pageExtensions: ['tsx'],
  images: {
    domains: ['https://www.arweave.net/', 'www.arweave.net', 'i.imgur.com']
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  }
});
