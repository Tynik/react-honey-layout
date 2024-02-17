import type { HoneyLayoutGridColumnStyledProps } from './HoneyGridColumnStyled';

export type HoneyLayoutGridColumnProps = Omit<
  HoneyLayoutGridColumnStyledProps,
  'columns' | 'spacing' | 'totalColumns' | 'totalTakeColumns'
> & {
  //
};
