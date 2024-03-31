import type { HoneyThemedProps } from './types';

export const camelToDashCase = (str: string) =>
  str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

type CreateMediaRuleOptions = {
  /**
   * Minimum width for the @media rule
   */
  minWidth?: string;
  /**
   * Maximum width for the @media rule
   */
  maxWidth?: string;
};

export const createMediaRule = ({ minWidth, maxWidth }: CreateMediaRuleOptions) => {
  if (!minWidth && !maxWidth) {
    throw new Error('`minWidth` or `maxWidth` should be set');
  }

  const minWidthRule = minWidth ? `(min-width: ${minWidth})` : '';
  const maxWidthRule = maxWidth ? `(max-width: ${maxWidth})` : '';

  return `@media only screen and ${minWidthRule}${minWidth && maxWidth ? ' and ' : ''}${maxWidthRule}`;
};

export const calculateSpacing =
  (spacing: number) =>
  ({ theme }: HoneyThemedProps) =>
    spacing * (theme.spacings?.base ?? 0);
