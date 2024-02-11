import styled, { css } from 'styled-components';

import type { HoneyLayoutBoxProps } from '../types';
import { generateMediaStyles, generateStyles } from '../helpers';

export const HoneyBox = styled.div<HoneyLayoutBoxProps>`
  ${() => css`
    ${generateStyles('xs')};

    ${generateMediaStyles('sm')};
    ${generateMediaStyles('md')};
    ${generateMediaStyles('lg')};
    ${generateMediaStyles('xl')};
  `}
`;
