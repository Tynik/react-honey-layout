import styled, { css } from 'styled-components';

import { Text } from './Text';

export const Description = styled(Text).attrs({
  as: 'div',
})`
  ${({ theme }) => css`
    font-size: 18px;
    font-weight: 300;
    letter-spacing: 0.025rem;
    line-height: 1.7rem;

    color: ${theme.colors?.neutral.lightGray};
  `}
`;
