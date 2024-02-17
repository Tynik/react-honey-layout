import type { CSSProperties } from 'styled-components';
import styled, { css } from 'styled-components';

import type { HoneyLayoutBoxProps } from '../../types';
import { calculateSpacing } from '../../utils';
import { HoneyGridColumnStyled } from './HoneyGridColumnStyled';
import { HoneyBox } from '../HoneyBox';

export type HoneyLayoutGridStyledProps = HoneyLayoutBoxProps & {
  /**
   * The height of each grid column.
   */
  columnHeight?: CSSProperties['height'];
  /**
   * The minimum height of each grid column.
   */
  minColumnHeight?: CSSProperties['height'];
  /**
   * The spacing between grid columns.
   */
  spacing?: number;
};

export const HoneyGridStyled = styled(HoneyBox)<HoneyLayoutGridStyledProps>`
  ${({ columnHeight, minColumnHeight, spacing = 0 }) => css`
    display: flex;
    gap: ${calculateSpacing(spacing)}px;

    > ${HoneyGridColumnStyled} {
      height: ${columnHeight};
      min-height: ${minColumnHeight};
    }
  `}
`;

HoneyGridStyled.defaultProps = {
  $flexWrap: 'wrap',
};
