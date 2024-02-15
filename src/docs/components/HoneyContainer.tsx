import styled, { css } from 'styled-components';

export const HoneyContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    height: min-content;
    margin: 0 auto;
    max-width: ${theme.container?.maxWidth};

    padding: 16px;
  `}
`;
