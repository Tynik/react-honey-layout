import type { CSSProperties } from 'styled-components';
import styled, { css } from 'styled-components';

import type { HoneyBoxProps } from '../../types';
import { resolveSpacing } from '../../helpers';
import { HoneyGridColumnStyled } from './HoneyGridColumn.styled';
import { HoneyBox } from '../HoneyBox';

export type HoneyGridStyledProps = HoneyBoxProps & {
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

export const HoneyGridStyled = styled(HoneyBox)<HoneyGridStyledProps>`
  ${({ columnHeight, minColumnHeight, spacing = 0 }) => css`
    display: flex;
    gap: ${resolveSpacing(spacing)};

    > ${HoneyGridColumnStyled} {
      height: ${columnHeight};
      min-height: ${minColumnHeight};
    }
  `}
`;

HoneyGridStyled.defaultProps = {
  $flexWrap: 'wrap',
};
