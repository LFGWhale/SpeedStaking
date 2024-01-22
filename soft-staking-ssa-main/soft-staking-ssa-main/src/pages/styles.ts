import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 26px;
  margin-bottom: 48px;

  .collection-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    img {
      /* border-radius: 999999px; */
    }

    h1 {
      font-size: 3.2rem;
    }
  }

  .wallet-adapter-button {
    color: ${({ theme }) => theme.colors.buttonText};
    background: ${({ theme }) => theme.colors.button};

    i {
      display: none !important;
    }

    transition: all 0.2s ease;
    :hover {
      filter: brightness(0.8);
      color: ${({ theme }) => theme.colors.buttonText};
      background: ${({ theme }) => theme.colors.button} !important;
    }
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    flex-direction: column;
    gap: 16px;
    margin-bottom: 16px;

    .collection-info {
      flex-direction: column;

      h1 {
        font-size: 2.2rem;
      }
    }
  }
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  max-width: 1050px;
  margin: 0 auto;
  padding: 20px;
  padding-bottom: 28px;
`;

export const StakingInfo = styled.section`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
  gap: 16px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    flex-direction: column;
    align-items: center;
  }
`;

export const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 20px;
  width: 100%;
  max-width: 300px;
  padding: 24px 32px;

  h6 {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.gray[11]};
  }

  strong {
    display: block;
    font-size: 3.2rem;
    margin-bottom: auto;
  }

  span {
    display: block;
    color: ${({ theme }) => theme.colors.gray[11]};
    font-size: 1.2rem;
  }

  > div {
    display: flex;
    gap: 4px;
    flex-direction: column;

    span {
      align-self: flex-end;
    }

    progress {
      width: 100%;
      height: 10px;
      border: none;
      border-radius: 20px;

      ::-webkit-progress-value {
        border-radius: 20px;
        background: #2a64ab;
      }

      ::-webkit-progress-bar {
        background: #e6e6e6;
        border-radius: 20px;
      }
    }
  }

  button {
    max-width: 100%;
    margin-top: 8px;
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    max-width: 90%;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.divider};
  border-radius: 2px;
  width: 100%;

  .staking-actions {
    margin-left: auto;
    display: flex;
    gap: 12px;
  }
`;

export const Button = styled.button<{ isActive?: boolean }>`
  border: none;
  border-radius: 12px;
  outline: none;
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.button : 'transparent'};
  padding: ${({ isActive }) => (isActive ? '8px 24px' : '8px 0')};
  font-weight: ${({ isActive }) => isActive && 'bold'};
  color: ${({ theme }) => theme.colors.buttonText};
  font-size: 1.2rem;
  text-transform: capitalize;
  cursor: pointer;
  transition: all 0.2s ease;

  :hover {
    filter: brightness(0.8);
  }

  :disabled {
    cursor: default;
    pointer-events: none;
    :hover {
      filter: none;
    }
  }
`;

export const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-auto-columns: 1fr;
  grid-column-gap: 28px;
  grid-row-gap: 28px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 230px));
  justify-content: flex-start;
  padding-bottom: 20px;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    justify-content: center;
  }
`;

export const TokenContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 12px;

  background: ${({ theme }) => theme.colors.card};
  padding: 16px;
  border-radius: 12px;

  img {
    border-radius: 12px;
  }

  h2 {
    font-size: 1.6rem;
    text-align: center;
  }

  button {
    width: 100%;
    border-radius: 99999px;
    border: 1px solid;
    background-color: ${({ theme }) => theme.colors.button};
    color: ${({ theme }) => theme.colors.buttonText};
    font-size: 1rem;
    padding: 8px 16px;
    text-transform: uppercase;
    margin-top: 12px;
    cursor: pointer;
    position: relative;

    transition: all 0.2s ease;

    :hover {
      filter: brightness(0.8);
    }

    :disabled {
      cursor: not-allowed;
      /* pointer-events: none; */

      :hover {
        filter: brightness(1);
      }
    }

    img {
      position: absolute;
      right: 10px;
      height: 80%;
      top: 0;
      bottom: 0;
      margin-top: auto;
      margin-bottom: auto;
    }
  }
`;
