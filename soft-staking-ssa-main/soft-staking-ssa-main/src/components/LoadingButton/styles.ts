import styled, { css } from 'styled-components';

export const Button = styled.button<{ isLoading?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  /* width: 100%; */
  max-width: 156px;
  padding: 10px;
  border-radius: 12px;
  text-transform: uppercase;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.colors.gray[1]};
  font-weight: bold;
  font-family: 'Source Code Pro', sans-serif;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.gray[12]};
  cursor: pointer;

  transition: all 0.2s ease;

  :hover {
    color: ${({ theme }) => theme.colors.gray[12]};
    background: ${({ theme }) => theme.colors.gray[2]};
  }

  &:disabled {
    display: none;
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      background-color: ${({ theme }) => theme.colors.gray[10]};
      cursor: pointer;
      pointer-events: none;
      color: ${({ theme }) => theme.colors.gray[6]};
    `}
`;
