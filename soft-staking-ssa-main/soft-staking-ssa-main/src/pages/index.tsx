/* eslint-disable @typescript-eslint/ban-ts-comment */
import Head from 'next/head';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery, useQueryClient } from 'react-query';

import { stringifyPKsAndBNs } from '@gemworks/gem-farm-ts';
import { programs } from '@metaplex/js';
import { BN, web3 } from '@project-serum/anchor';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { SignerWalletAdapter } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  Connection,
  ParsedAccountData,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction
} from '@solana/web3.js';
import axios from 'axios';
import bs58 from 'bs58';
import { formatDistanceStrict } from 'date-fns';
import { sign } from 'tweetnacl';

import { FARM_ADDRESS, COLLECTION_NAME, TOKEN_NAME } from '../../constants';
import { GemFarm, initGemFarm } from '../common/gem-farm';
import Card from '../components/Card';
import { Connect } from '../components/Connects';
import { Footer } from '../components/Footer';
import { Loader } from '../components/Loader';
import { LoadingButton } from '../components/LoadingButton';
import { Modal } from '../components/Modal';
import { WalletToken } from '../types';
import { calcPercentage } from '../utils/calcPercentage';
import {
  genesysRpc
  //  mainNet
} from '../utils/connection';
import { handleClaim } from '../utils/generateTX';
import {
  Button,
  ButtonGroup,
  Content,
  GridContainer,
  Header,
  InfoCard,
  // PageContainer,
  StakingInfo,
  TokenContainer
} from './styles';

import logo from '/public/newLogo.svg';
import template from '/public/ssa-template.gif';
interface Total {
  percentage: number;
  supply: number;
  staked: number;
}

const oneBN = new BN('1');

const CONSTANTS = {
  collectionId: '626f13ab852a34dbb267fe16',
  SERVER_URL: 'https://soft-staking.herokuapp.com'
};

export default function Farm() {
  const queryClient = useQueryClient();
  const {
    connected,
    publicKey,
    wallet,
    signTransaction,
    signAllTransactions,
    signMessage
  } = useWallet();
  // const publicKey = new PublicKey(
  //   'ju8Zb4orH6ZrP2EqdF69yh91khcnVtkA98tKkfrB7j7'
  // );

  const farmStr = FARM_ADDRESS;
  const farm = new PublicKey(farmStr as string);
  const [farmAccount, setFarmAccount] = useState<any>();
  const [farmClient, setClient] = useState<GemFarm>();
  const [farmer, setFarmer] = useState<any>();
  const [vault, setVault] = useState<any>();
  const [stakedNFTs, setStakedNFTs] = useState<any>();
  const [availableReward, setAvailableReward] = useState<any>();
  const [walletNfts, setWalletNfts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isStartStakingModalOpen, setIsStartStakingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'unstaked' | 'staked'>('unstaked');
  const [decimals, setDecimals] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [staking, setStaking] = useState('');
  const [total, setTotal] = useState<Total>({
    percentage: 0,
    supply: 0,
    staked: 0
  });
  const [reward, setReward] = useState(0);

  // console.log('c', connected, farmer?.state)

  useEffect(() => {
    if (!connected) return;
    getData();
    getStaked();
    getUnstaked();
    getStakedTotal();
    getReward();
  }, [connected]);

  async function getReward() {
    try {
      const instance = axios.create({
        headers: {
          Authorization: publicKey.toString()
        }
      });

      const { data } = await instance.get(
        `${CONSTANTS.SERVER_URL}/stake/reward/total`
      );
      setReward(data.totalRewardValue);
    } catch (e) {
      console.log('e', e.message);
    }
  }

  async function getStaked() {
    try {
      const instance = axios.create({
        baseURL: `${CONSTANTS.SERVER_URL}/stake`,
        headers: {
          Authorization: publicKey.toString(),
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': '*'
        }
      });

      const response = await instance.get(`${CONSTANTS.SERVER_URL}/stake`);
      setStakedNFTs(response.data);
    } catch (e) {
      console.log('e', e.message);
      setStakedNFTs([]);
    }
  }

  async function getUnstaked() {
    const instance = axios.create({
      baseURL: `${CONSTANTS.SERVER_URL}/stake/options`,
      headers: { Authorization: publicKey.toString() }
    });

    const { data } = await instance.get(
      `${CONSTANTS.SERVER_URL}/stake/options?collectionId=${CONSTANTS.collectionId}`
    );
    setIsPageLoading(false);
    setWalletNfts(data);
  }

  async function getStakedTotal() {
    const instance = axios.create({
      headers: { Authorization: publicKey.toString() }
    });
    const body = {
      collectionId: CONSTANTS.collectionId
    };

    const { data } = await instance.post(
      `${CONSTANTS.SERVER_URL}/stake/ratio`,
      body
    );
    const obj = {
      percentage: data.ratio,
      staked: data.staked,
      supply: data.total
    };
    setTotal(obj);
  }

  async function stakeAll(list: any) {
    toast.success(
      'Thank you for staking your squirrels. It may take several minutes for the staking process to complete. You may leave this page, return, and refresh your browser to confirm that your squirrels have been staked.',
      {
        duration: 10000
      }
    );
    const instance = axios.create({
      headers: { Authorization: publicKey.toString() }
    });
    const body = {
      collectionId: CONSTANTS.collectionId,
      nftStakedList: list.map(({ mint }) => mint)
    };
    await instance.post(`${CONSTANTS.SERVER_URL}/stake/all`, body);
    getData();
    getStaked();
    getUnstaked();
    getStakedTotal();
  }

  async function getData() {
    try {
      const instance = axios.create({
        baseURL: `${CONSTANTS.SERVER_URL}/collections/collection`,
        headers: {
          Authorization: publicKey.toString()
        }
      });
      const body = {
        id: CONSTANTS.collectionId
      };
      const { data } = await instance.post(
        `${CONSTANTS.SERVER_URL}/collections/collection`,
        body
      );

      // console.log('getData', data);
    } catch (error) {
      console.log('error 133', error);
      // console.log('error', error);
    }
  }
  async function Claim(amount) {
    if (!connected || !publicKey) {
      toast.error('Connect your wallet.');
      return;
    }

    if (!signMessage) {
      toast.error('Wallet does not support message signing!');
      return;
    }

    // Encode anything as bytes
    const message = new TextEncoder().encode('SOLALAND');
    // console.log('1');

    // Sign the bytes using the wallet
    const signature = await signMessage(message);
    // console.log('2');

    // Verify that the bytes were signed using the private key that matches the known public key
    if (!sign.detached.verify(message, signature, publicKey.toBytes())) {
      throw new Error('Invalid signature!');
    }
    // console.log('3');

    const reqBody = {
      wallet: String(publicKey),
      signature: bs58.encode(signature)
    };

    // console.log(reqBody);

    // toast.error('Wait at least 1 day to claim');
    const instance = axios.create({
      headers: { Authorization: publicKey.toString() }
    });
    const body = {
      stakeId: amount['_id'],
      wallet: String(publicKey),
      signature: bs58.encode(signature)
    };
    // console.log(body);
    const { data } = await instance.post(
      `${CONSTANTS.SERVER_URL}/stake/reward`,
      body
    );
    if (data.reward === 0) {
      toast.error("There's Nothing to claim");
      return false;
    }
    // console.log(data.reward);
    const token = {
      multiplier: Math.pow(10, 9),
      mintAddress: '7pDvbQZ9ANogmc36xpjemR1T9ngkxSSvSr1WmuX6cnd'
    };
    const tx = await handleClaim(
      publicKey.toString() || '',
      token,
      signTransaction,
      data.reward
    );
    // console.log({ tx });
    console.log('ujsabdnfoiusdhf', tx);
    if (!tx) return false;
    console.log('depois do id');
    const newBody = {
      tx,
      stakeId: amount['_id']
    };
    const instance2 = axios.create({
      baseURL: `${CONSTANTS.SERVER_URL}/stake/reward`,
      headers: { Authorization: publicKey.toString() }
    });
    const { data: newData } = await instance2.post(
      `${CONSTANTS.SERVER_URL}/stake/claim`,
      newBody
    );
    getReward();
    return true;
  }

  async function ClaimAll() {
    // Get the reward
    // make tx
    // send tx
    const instance = axios.create({
      headers: { Authorization: publicKey.toString() }
    });
    const { data } = await instance.get(
      `${CONSTANTS.SERVER_URL}/stake/reward/total`
    );
    console.log('check1', data.totalRewardValue);
    if (data.totalRewardValue === 0) {
      toast.error("There's Nothing to claim");
      return false;
    }
    toast.success(
      "Congratulations for claim your pecans. It may take several minutes for the claiming process to complete. Don't leave this page util the process is complete.",
      {
        duration: 10000
      }
    );
    // console.log(data.reward);
    const token = {
      multiplier: Math.pow(10, 9),
      mintAddress: '7pDvbQZ9ANogmc36xpjemR1T9ngkxSSvSr1WmuX6cnd'
    };
    const tx = await handleClaim(
      publicKey.toString() || '',
      token,
      signTransaction,
      data.totalRewardValue
    );
    // console.log({ tx });
    console.log('ujsabdnfoiusdhf', tx);
    if (!tx) return false;
    console.log('depois do id');
    const newBody = {
      tx
    };
    const instance2 = axios.create({
      baseURL: `${CONSTANTS.SERVER_URL}/stake/reward/total`,
      headers: { Authorization: publicKey.toString() }
    });
    const { data: newData } = await instance2.post(
      `${CONSTANTS.SERVER_URL}/stake/claim/all`,
      newBody
    );
    getReward();
    return true;
  }

  async function Unstake(amount) {
    if (!connected || !publicKey) {
      toast.error('Connect your wallet.');
      return;
    }

    if (!signMessage) {
      toast.error('Wallet does not support message signing!');
      return;
    }

    // Encode anything as bytes
    const message = new TextEncoder().encode('SOLALAND');
    // console.log('1');

    // Sign the bytes using the wallet
    const signature = await signMessage(message);
    // console.log('2');

    // Verify that the bytes were signed using the private key that matches the known public key
    if (!sign.detached.verify(message, signature, publicKey.toBytes())) {
      throw new Error('Invalid signature!');
    }
    // console.log('3');

    const reqBody = {
      wallet: String(publicKey),
      signature: bs58.encode(signature)
    };

    // console.log(reqBody);
    // toast.error('Wait at least 1 day to claim');
    const instance = axios.create({
      headers: { Authorization: publicKey.toString() }
    });
    const body = {
      id: amount['_id'],
      wallet: String(publicKey),
      signature: bs58.encode(signature)
    };
    const dat = await Claim(amount);
    if (!dat) return;
    await instance.post(`${CONSTANTS.SERVER_URL}/stake/delete`, body);
    getData();
    getStaked();
    getUnstaked();
    getStakedTotal();
  }

  async function UnstakeAll(amount) {
    if (!connected || !publicKey) {
      toast.error('Connect your wallet.');
      return;
    }

    if (!signMessage) {
      toast.error('Wallet does not support message signing!');
      return;
    }

    // Encode anything as bytes
    const message = new TextEncoder().encode('SOLALAND');
    // console.log('1');

    // Sign the bytes using the wallet
    const signature = await signMessage(message);
    // console.log('2');

    // Verify that the bytes were signed using the private key that matches the known public key
    if (!sign.detached.verify(message, signature, publicKey.toBytes())) {
      throw new Error('Invalid signature!');
    }
    // console.log('3');

    const reqBody = {
      wallet: String(publicKey),
      signature: bs58.encode(signature)
    };

    // console.log(reqBody);
    // toast.error('Wait at least 1 day to claim');
    const instance = axios.create({
      headers: { Authorization: publicKey.toString() }
    });
    const body = {
      stakeId: amount['_id'],
      wallet: String(publicKey),
      signature: bs58.encode(signature)
    };

    const { data } = await instance.get(
      `${CONSTANTS.SERVER_URL}/stake/reward/total`
    );
    console.log('rewardddd', data.totalRewardValue);
    if (!(data.totalRewardValue === 0)) {
      const dat = await ClaimAll();
      if (!dat) return;
    }

    const { data: newData } = await instance.post(
      `${CONSTANTS.SERVER_URL}/stake/delete/all`,
      body
    );
    getData();
    getStaked();
    getUnstaked();
    getStakedTotal();
  }

  async function stakeToken(token) {
    setStaking(token);

    const instance = axios.create({
      baseURL: `${CONSTANTS.SERVER_URL}/stake`,
      headers: { Authorization: publicKey.toString() }
    });

    if (!signMessage) {
      return;
    }

    // Encode anything as bytes
    const message = new TextEncoder().encode('SOLALAND');
    // console.log('1');

    // Sign the bytes using the wallet
    const signature = await signMessage(message);

    if (!sign.detached.verify(message, signature, publicKey.toBytes())) {
      throw new Error('Invalid signature!');
    }

    const body = {
      collectionId: CONSTANTS.collectionId,
      nftStaked: token,
      wallet: publicKey.toString(),
      signature: bs58.encode(signature),
      claimDate: 30
    };
    // console.log(body);
    const { data } = await instance.post(`${CONSTANTS.SERVER_URL}/stake`, body);
    // console.log('stake request', data);
    setStakedNFTs(data.staked);
    setWalletNfts(data.unstaked);
    setStaking('');
    // setWalletNfts(data.unstaked);
    // muar aqui
    // getStaked();
    // getUnstaked();
    // console.log('stakeToken', data);
  }

  function handleToggleModal() {
    setIsStartStakingModalOpen((oldState) => !oldState);
  }

  function handleStartStaking() {
    handleToggleModal();
  }

  return (
    <>
      <Head>
        <title>{COLLECTION_NAME}</title>
      </Head>
      <Header>
        <div className="collection-info">
          <Image
            src={logo}
            alt={`${COLLECTION_NAME} logo image"`}
            width={210}
            height={61}
          />
        </div>
        <Connect />
      </Header>
      <Content>
        <StakingInfo>
          <InfoCard>
            <h6>Total Squirrels Staked</h6> <strong>{total.percentage}%</strong>
            <div>
              {farmAccount && (
                <span>
                  {total.staked}/{total?.supply}
                </span>
              )}
              <progress value={total.staked || 0} max={total.supply} />
            </div>
          </InfoCard>

          <InfoCard>
            <h6>
              My{' '}
              {!farmer || Object.keys(farmer?.state)[0] === 'unstaked'
                ? 'Vaulted'
                : 'Staked'}{' '}
              Squirrels
            </h6>
            <strong>
              {String(stakedNFTs?.length || 0).padStart(2, '0') || '00'}
            </strong>
          </InfoCard>

          {connected && (
            <InfoCard>
              <h6>Available to Claim</h6>
              <strong>{reward} PECANS</strong>
            </InfoCard>
          )}
        </StakingInfo>
        <ButtonGroup>
          <Button
            isActive={activeTab === 'unstaked'}
            onClick={() => setActiveTab('unstaked')}
            disabled={!connected || isLoading}
          >
            Unstaked {!!walletNfts && connected && `(${walletNfts.length})`}
          </Button>
          <Button
            isActive={activeTab === 'staked'}
            onClick={() => setActiveTab('staked')}
            disabled={!connected || isLoading}
          >
            Staked {!!stakedNFTs && connected && `(${stakedNFTs.length})`}
          </Button>
          {connected && (
            <div className="staking-actions">
              {walletNfts.length >= 0 && (
                <>
                  <LoadingButton
                    onClick={() => UnstakeAll(walletNfts)}
                    isLoading={isLoading}
                  >
                    Unstake All
                  </LoadingButton>
                  <LoadingButton
                    onClick={() => stakeAll(walletNfts)}
                    isLoading={isLoading}
                  >
                    Stake All
                  </LoadingButton>
                  <LoadingButton
                    onClick={() => ClaimAll()}
                    isLoading={isLoading}
                  >
                    Claim All
                  </LoadingButton>
                </>
              )}

              {/* {(Object.keys(farmer?.state)[0] === 'staked' ||
                Object.keys(farmer?.state)[0] === 'pendingCooldown') &&
                activeTab === 'staked' && (
                  <LoadingButton
                    onClick={() => console.log('end staking')}
                    isLoading={isLoading}
                  >
                    {Object.keys(farmer?.state)[0] === 'staked'
                      ? 'End staking'
                      : 'End cooldown'}
                  </LoadingButton>
                )} */}
            </div>
          )}
        </ButtonGroup>
        {/* arrumar condição */}
        {connected && !walletNfts ? (
          <>
            {isPageLoading ? (
              <Loader />
            ) : (
              <>
                <p>No farmer account found... Create a new one?</p>

                <LoadingButton
                  onClick={() => console.log('register')}
                  isLoading={isLoading}
                >
                  Register as Staker
                </LoadingButton>
              </>
            )}
          </>
        ) : (
          <GridContainer>
            {activeTab === 'unstaked'
              ? connected &&
                walletNfts.map((token, index) => (
                  <TokenContainer key={Math.random() * index}>
                    <Image
                      src={token.image}
                      alt={token?.data?.name || token?.name}
                      width={200}
                      height={212}
                      loader={({ src, width }) => `${src}?w=${width}`}
                    />
                    <h2>{token?.name}</h2>
                    <h2>$Pecans/day: {token?.data?.payout || token?.payout}</h2>
                    <button
                      onClick={() => stakeToken(token.mint)}
                      disabled={staking === token.mint}
                    >
                      STAKE
                      {staking === token.mint && <img src="/loader.svg" />}
                    </button>
                  </TokenContainer>
                ))
              : connected &&
                stakedNFTs &&
                stakedNFTs.map((token, index) => (
                  <Card
                    key={index}
                    token={token}
                    index={index}
                    Unstake={Unstake}
                    Claim={Claim}
                    isLoading={isLoading}
                  />
                ))}
          </GridContainer>
        )}
      </Content>
      <Footer />
      <Modal
        isOpen={isStartStakingModalOpen}
        toggleModal={handleToggleModal}
        handleStartStaking={handleStartStaking}
      />
    </>
  );
}
