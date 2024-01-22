import Image from 'next/image';

import { useState } from 'react';

import { intervalToDuration } from 'date-fns';

import { TokenContainer } from './styles';

export default function Card({ token, index, Unstake, Claim, isLoading }) {
  const [timeStaked, setTimeStaked] = useState('');
  const [days, setDays] = useState(0);
  const [daysStaked, setDaysStaked] = useState(0);

  setInterval(() => {
    const now = new Date();
    const end = new Date(token.createdAt);
    const lastClaim = new Date(token.updatedAt);
    //calculate date difference in days
    const difference = intervalToDuration({
      start: end,
      end: now
    });

    const differenceLastClaim = intervalToDuration({
      start: lastClaim,
      end: now
    });

    setDays(difference.days);

    //gey days difference in days
    setDaysStaked(Math.floor((now.getTime() - lastClaim.getTime()) / 86400000));

    if (difference.years > 0) {
      setTimeStaked(`${difference.years} years`);
    } else if (difference.months > 0) {
      setTimeStaked(`${difference.months} months, ${difference.days} days`);
    } else if (difference.days > 0) {
      setTimeStaked(`${difference.days} days, ${difference.hours} hours`);
    } else {
      setTimeStaked(`${difference.hours} hours, ${difference.minutes} minutes`);
    }
  }, 1000);

  return (
    <TokenContainer key={Math.random() * index}>
      <Image
        src={
          token?.data?.image ||
          token?.image ||
          'https://arweave.net/8rnYEWx6mGcudrPVteVjCWvnxCzFi1huxPdbETM3apI'
        }
        alt={token?.data?.name || token?.name}
        width={200}
        height={212}
        loader={({ src, width }) => `${src}?w=${width}`}
      />
      <h2>{token?.data?.name || token?.name || 'NoiaDuck 191'}</h2>
      <h2>Time Staked: {timeStaked}</h2>
      {daysStaked < 90 && <h2>Next Bonus: 90 days</h2>}
      {daysStaked > 90 && daysStaked < 180 && <h2>Next Bonus: 180 days</h2>}
      {daysStaked > 180 && daysStaked < 365 && <h2>Next Bonus: 365 days</h2>}
      {daysStaked > 90 && daysStaked < 180 && (
        <h2>Available Bonus 100 $Pecans</h2>
      )}
      {daysStaked > 180 && daysStaked < 365 && (
        <h2>Available Bonus 250 $Pecans</h2>
      )}
      {daysStaked >= 365 && <h2>Available Bonus 1000 $Pecans</h2>}
      <h2>$Pecans/day: {token?.data?.payout || token?.payout}</h2>
      <button onClick={() => Unstake(token)} disabled={isLoading}>
        Unstake
      </button>
      <button onClick={() => Claim(token)} disabled={isLoading}>
        Claim <span>{token.reward} PECANS</span>
      </button>
    </TokenContainer>
  );
}
