import {
  GemFarmClient,
  FarmConfig,
  VariableRateConfig,
  FixedRateConfig,
  WhitelistType
} from '@gemworks/gem-farm-ts';
import { programs } from '@metaplex/js';
import * as anchor from '@project-serum/anchor';
import { BN, Idl } from '@project-serum/anchor';
import { SignerWalletAdapter } from '@solana/wallet-adapter-base';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';

import { createFakeWallet } from '../../common/gem-bank';
import { DEFAULTS } from '../../globals';
import { bankIdl } from '../idls/bank';
import { farmIdl } from '../idls/farm';

export async function initGemFarm(
  conn: Connection,
  wallet?: SignerWalletAdapter
) {
  const walletToUse = wallet ?? createFakeWallet();

  return new GemFarm(
    conn,
    walletToUse as anchor.Wallet,
    farmIdl as any,
    bankIdl as any
  );
}

export class GemFarm extends GemFarmClient {
  constructor(
    conn: Connection,
    wallet: anchor.Wallet,
    farmIdl: Idl,
    bankIdl: Idl
  ) {
    const farmProgId = DEFAULTS.GEM_FARM_PROG_ID;
    const bankProgId = DEFAULTS.GEM_BANK_PROG_ID;
    super(conn, wallet, farmIdl, farmProgId, bankIdl, bankProgId);
  }

  async initFarmWallet(
    rewardAMint: PublicKey,
    rewardAType: any,
    rewardBMint: PublicKey,
    rewardBType: any,
    farmConfig: FarmConfig
  ) {
    const farm = Keypair.generate();
    const bank = Keypair.generate();

    const result = await this.initFarm(
      farm,
      this.wallet.publicKey,
      this.wallet.publicKey,
      bank,
      rewardAMint,
      rewardAType,
      rewardBMint,
      rewardBType,
      farmConfig
    );

    console.log('new farm started!', farm.publicKey.toBase58());
    console.log('bank is:', bank.publicKey.toBase58());

    return { farm, bank, ...result };
  }

  async updateFarmWallet(
    farm: PublicKey,
    newConfig?: FarmConfig,
    newManager?: PublicKey
  ) {
    const result = await this.updateFarm(
      farm,
      this.wallet.publicKey,
      newConfig,
      newManager
    );

    console.log('updated the farm');

    return result;
  }

  async authorizeFunderWallet(farm: PublicKey, funder: PublicKey) {
    const result = await this.authorizeFunder(
      farm,
      this.wallet.publicKey,
      funder
    );

    console.log('authorized funder', funder.toBase58());

    return result;
  }

  async deauthorizeFunderWallet(farm: PublicKey, funder: PublicKey) {
    const result = await this.deauthorizeFunder(
      farm,
      this.wallet.publicKey,
      funder
    );

    console.log('DEauthorized funder', funder.toBase58());

    return result;
  }

  async fundVariableRewardWallet(
    farm: PublicKey,
    rewardMint: PublicKey,
    amount: string,
    duration: string
  ) {
    const rewardSource = await this.findATA(rewardMint, this.wallet.publicKey);

    const config: VariableRateConfig = {
      amount: new BN(amount),
      durationSec: new BN(duration)
    };

    const result = this.fundReward(
      farm,
      rewardMint,
      this.wallet.publicKey,
      rewardSource,
      config
    );

    console.log('funded variable reward with mint:', rewardMint.toBase58());

    return result;
  }

  async fundFixedRewardWallet(
    farm: PublicKey,
    rewardMint: PublicKey,
    amount: string,
    duration: string,
    baseRate: string,
    denominator: string,
    t1RewardRate?: string,
    t1RequiredTenure?: string,
    t2RewardRate?: string,
    t2RequiredTenure?: string,
    t3RewardRate?: string,
    t3RequiredTenure?: string
  ) {
    const rewardSource = await this.findATA(rewardMint, this.wallet.publicKey);

    const config: FixedRateConfig = {
      schedule: {
        baseRate: new BN(baseRate),
        tier1: t1RewardRate
          ? {
              rewardRate: new BN(t1RewardRate),
              requiredTenure: new BN(t1RequiredTenure!)
            }
          : null,
        tier2: t2RewardRate
          ? {
              rewardRate: new BN(t2RewardRate),
              requiredTenure: new BN(t2RequiredTenure!)
            }
          : null,
        tier3: t3RewardRate
          ? {
              rewardRate: new BN(t3RewardRate),
              requiredTenure: new BN(t3RequiredTenure!)
            }
          : null,
        denominator: new BN(denominator)
      },
      amount: new BN(amount),
      durationSec: new BN(duration)
    };

    console.log('fund', {
      farm,
      rewardMint,
      pk: this.wallet.publicKey,
      rewardSource,
      undefined,
      config
    });

    const result = await this.fundReward(
      farm,
      rewardMint,
      this.wallet.publicKey,
      rewardSource,
      undefined,
      config
    );

    console.log('funded fixed reward with mint:', rewardMint.toBase58());

    return result;
  }

  async cancelRewardWallet(farm: PublicKey, rewardMint: PublicKey) {
    const result = await this.cancelReward(
      farm,
      this.wallet.publicKey,
      rewardMint,
      this.wallet.publicKey
    );

    console.log('cancelled reward', rewardMint.toBase58());

    return result;
  }

  async lockRewardWallet(farm: PublicKey, rewardMint: PublicKey) {
    const result = await this.lockReward(
      farm,
      this.wallet.publicKey,
      rewardMint
    );

    console.log('locked reward', rewardMint.toBase58());

    return result;
  }

  async refreshFarmerWallet(farm: PublicKey, farmerIdentity: PublicKey) {
    const result = await this.refreshFarmer(farm, farmerIdentity);

    console.log('refreshed farmer', farmerIdentity.toBase58());

    return result;
  }

  async treasuryPayoutWallet(
    farm: PublicKey,
    destination: PublicKey,
    lamports: string
  ) {
    const result = await this.payoutFromTreasury(
      farm,
      this.wallet.publicKey,
      destination,
      new BN(lamports)
    );

    console.log('paid out from treasury', lamports);

    return result;
  }

  async initFarmerWallet(farm: PublicKey) {
    const result = await this.initFarmer(
      farm,
      this.wallet.publicKey,
      this.wallet.publicKey
    );

    console.log('initialized new farmer', this.wallet.publicKey.toBase58());

    return result;
  }

  async stakeWallet(farm: PublicKey) {
    const result = await this.stake(farm, this.wallet.publicKey);

    console.log('begun staking for farmer', this.wallet.publicKey.toBase58());

    return result;
  }

  async unstakeWallet(farm: PublicKey) {
    const result = await this.unstake(farm, this.wallet.publicKey);

    console.log('ended staking for farmer', this.wallet.publicKey.toBase58());

    return result;
  }

  async claimWallet(
    farm: PublicKey,
    rewardAMint: PublicKey,
    rewardBMint: PublicKey
  ) {
    const result = await this.claim(
      farm,
      this.wallet.publicKey,
      rewardAMint,
      rewardBMint
    );

    console.log('claimed rewards for farmer', this.wallet.publicKey.toBase58());

    return result;
  }

  async flashDepositWallet(
    farm: PublicKey,
    gemAmount: string,
    gemMint: PublicKey,
    gemSource: PublicKey,
    creator: PublicKey
  ) {
    const farmAcc = await this.fetchFarmAcc(farm);
    const bank = farmAcc.bank;

    const [mintProof] = await this.findWhitelistProofPDA(bank, gemMint);
    const [creatorProof] = await this.findWhitelistProofPDA(bank, creator);
    const metadata = await programs.metadata.Metadata.getPDA(gemMint);

    const result = await this.flashDeposit(
      farm,
      this.wallet.publicKey,
      new BN(gemAmount),
      gemMint,
      gemSource,
      mintProof,
      metadata,
      creatorProof
    );

    console.log('added extra gem for farmer', this.wallet.publicKey.toBase58());

    return result;
  }

  async addToBankWhitelistWallet(
    farm: PublicKey,
    addressToWhitelist: PublicKey,
    whitelistType: WhitelistType
  ) {
    const result = await this.addToBankWhitelist(
      farm,
      this.wallet.publicKey,
      addressToWhitelist,
      whitelistType
    );

    console.log(`${addressToWhitelist.toBase58()} added to whitelist`);

    return result;
  }

  async removeFromBankWhitelistWallet(
    farm: PublicKey,
    addressToRemove: PublicKey
  ) {
    const result = await this.removeFromBankWhitelist(
      farm,
      this.wallet.publicKey,
      addressToRemove
    );

    console.log(`${addressToRemove.toBase58()} removed from whitelist`);

    return result;
  }
}
