import styled, { css } from 'styled-components';

import { calculateSpacing } from '../../utils';

export const MDXWrapper = styled.div`
  ${({ theme }) => css`
    font-size: 18px;
    letter-spacing: 0.025rem;
    line-height: 2rem;

    color: ${theme.colors?.neutral.lightGray};

    h3 {
      position: relative;

      margin: ${calculateSpacing(5)}px 0 0;
      padding-left: ${calculateSpacing(2)}px;

      &:before {
        position: absolute;
        content: '|';

        top: -2px;
        left: 0;
        margin-right: ${calculateSpacing(1)}px;

        font-weight: bold;
        font-size: 2.5rem;
      }
    }
  `}
`;
