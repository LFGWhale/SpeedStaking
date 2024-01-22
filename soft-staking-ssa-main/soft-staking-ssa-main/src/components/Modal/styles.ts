import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 64px 24px;
  text-align: center;

  h1 {
    font-weight: bold;
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.gray[12]};
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    padding: 42px 16px;
  }
`;
export const Info = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;

  p {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.gray[11]};
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 48px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 6px;
    outline: none;
    color: ${({ theme }) => theme.colors.buttonText};
    background-color: ${({ theme }) => theme.colors.button};
    font-size: 1.6rem;
    font-weight: bold;
    text-transform: capitalize;
    padding: 16px 32px;
    cursor: pointer;
    transition: all 0.2s ease;

    :hover {
      filter: brightness(0.8);
    }
  }

  .cancel-button {
    background: #a8a8b3;
    color: #fff;

    :hover {
      filter: brightness(0.8);
    }
  }
`;
