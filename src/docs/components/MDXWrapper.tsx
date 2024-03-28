import styled, { css } from 'styled-components';

export const MDXWrapper = styled.div`
  ${({ theme }) => css`
    font-size: 18px;
    font-weight: 300;
    letter-spacing: 0.025rem;
    line-height: 2rem;

    color: ${theme.colors?.neutral.lightGray};
  `}
`;
