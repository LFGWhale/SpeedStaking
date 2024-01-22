import Image from 'next/image';

import { LoadingArea } from './styles';

import loader from '/public/loader.svg';

export const Loader = () => {
  return (
    <LoadingArea>
      <Image src={loader} height={150} width={150} alt="Loading" priority />
    </LoadingArea>
  );
};
