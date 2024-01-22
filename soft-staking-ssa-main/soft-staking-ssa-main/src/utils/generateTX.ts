import { web3 } from '@project-serum/anchor';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey, Connection } from '@solana/web3.js';
import axios from 'axios';

const genesysRpc = new Connection(
  'https://small-red-dew.solana-mainnet.quiknode.pro/a7a53c5e116e9196170c3ee6ddc1a150dd64cf9b/',
  'confirmed'
);

const infos = {
  publicKey: 'GBCAUgzZMPkZ8hfGHMdtqSDhvVqv6MCUJqyaWsgVZoEM'
};

export async function handleClaim(
  publicKey: string,
  token: any,
  signTransaction: any,
  amount: number
) {
  console.log({
    publicKey,
    token,
    amount
  });
  try {
    const TOKEN_PROGRAM_ID = new web3.PublicKey(
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
    );

    const instructions = [];
    const claimerPublicKey = new PublicKey(publicKey); // recebe
    console.log(1);

    let tokens: any[] = [];
    console.log(2);

    const airdropPublicKey = new PublicKey(infos.publicKey); // envia

    console.log(3);

    // const fees = 0;

    const mintPublicKey = new PublicKey(token.mintAddress);
    console.log('token.mintAddress', token.mintAddress);

    console.log(4);

    const mintToken = new Token(
      genesysRpc,
      mintPublicKey,
      TOKEN_PROGRAM_ID,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      claimerPublicKey
    ); // the wallet owner will pay to transfer and to create recipients associated token account if it does not yet exist.

    console.log(5);

    try {
      const senderTokenAccount =
        await mintToken.getOrCreateAssociatedAccountInfo(airdropPublicKey);

      console.log(6);

      const associatedDestinationTokenAddr =
        await Token.getAssociatedTokenAddress(
          mintToken.associatedProgramId,
          mintToken.programId,
          mintPublicKey,
          claimerPublicKey
        );

      console.log(7);

      const claimerAccount = await genesysRpc.getAccountInfo(
        associatedDestinationTokenAddr
      );

      console.log(8);

      if (claimerAccount === null) {
        console.log('creating account');
        tokens.push(mintToken);

        instructions.push(
          Token.createAssociatedTokenAccountInstruction(
            mintToken.associatedProgramId,
            mintToken.programId,
            mintPublicKey,
            associatedDestinationTokenAddr,
            claimerPublicKey,
            claimerPublicKey
          )
        );
      }

      console.log(9);

      instructions.push(
        Token.createTransferInstruction(
          TOKEN_PROGRAM_ID,
          senderTokenAccount.address,
          associatedDestinationTokenAddr,
          airdropPublicKey,
          [],
          amount * token.multiplier
        )
      );
    } catch (e) {
      console.log(e);
      const TOKEN_PUBKEY = new PublicKey(
        'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
      );
      const filter = {
        memcmp: {
          offset: 0,
          bytes: String(mintPublicKey)
        }
      };
      const filter2 = {
        dataSize: 165
      };
      const getFilter = [filter, filter2];
      const programAccountsConfig = {
        filters: getFilter,
        encoding: 'jsonParsed'
      };
      const accounts = await genesysRpc.getParsedProgramAccounts(
        TOKEN_PUBKEY,
        programAccountsConfig
      );

      instructions.push(
        Token.createSetAuthorityInstruction(
          TOKEN_PROGRAM_ID,
          accounts[0].pubkey,
          claimerPublicKey,
          'AccountOwner',
          airdropPublicKey,
          []
        )
      );

      console.log('pub', accounts[0].pubkey.toString());
    }

    console.log(10);

    tokens = [];

    const transaction = new web3.Transaction().add(...instructions);

    transaction.feePayer = claimerPublicKey;

    transaction.recentBlockhash = (
      await genesysRpc.getLatestBlockhash()
    ).blockhash;

    const tx = await signTransaction(transaction);
    console.log(11);
    console.log({ tx });

    const serialized = tx.serialize({
      verifySignatures: false,
      requireAllSignatures: false
    });
    console.log(12);

    return serialized;

    // ate aqui
  } catch (err: any) {
    console.log('Something went wrong', err);
  }
}
