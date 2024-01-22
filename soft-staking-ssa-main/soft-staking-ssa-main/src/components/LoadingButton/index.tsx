import Image from 'next/image';

import { FC, HTMLProps, ReactNode } from 'react';

import { Button } from './styles';

import loader from '/public/loader.svg';

interface LoadingButtonProps {
  children: ReactNode;
  isLoading?: boolean;
}

const LoadingButton: FC<LoadingButtonProps & HTMLProps<HTMLButtonElement>> = ({
  children,
  isLoading,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button {...props} isLoading={isLoading}>
      {children}
      {isLoading && <Image src={loader} alt="Loader" width={12} height={12} />}
    </Button>
  );
};

export { LoadingButton };
