import styled, { css } from 'styled-components';

export const Text = styled.span`
  ${({ theme }) => css`
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-style: normal;
    line-height: 1rem;
  `}
`;
