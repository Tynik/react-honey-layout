import styled, { css } from 'styled-components';
import type { HTMLAttributes } from 'react';

import type { HoneyCSSProperties } from '../types';
import { generateMediaStyles, generateStyles } from '../helpers';
import { HTML_ATTRIBUTES } from '../constants';

export type HoneyBoxProps = HTMLAttributes<HTMLElement> & HoneyCSSProperties;

export const HoneyBox = styled.div.withConfig({
  shouldForwardProp: prop =>
    HTML_ATTRIBUTES.includes(prop as never) ||
    prop.startsWith('on') ||
    prop.startsWith('data-') ||
    prop.startsWith('aria-'),
})<HoneyBoxProps>`
  ${() => css`
    ${generateStyles('xs')};

    ${generateMediaStyles('sm')};
    ${generateMediaStyles('md')};
    ${generateMediaStyles('lg')};
    ${generateMediaStyles('xl')};
  `}
`;
