import styled from 'styled-components';

export const Container = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border-top: 1px solid ${({ theme }) => theme.colors.gray[11]}; */

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    cursor: pointer;

    h2 {
      font-size: 1rem;
      font-family: sans-serif;
    }
  }
`;
