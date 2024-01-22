import styled from 'styled-components';

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
    border-radius: 20px;
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
