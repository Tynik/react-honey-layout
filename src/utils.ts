import type { HoneySpacings, HoneyThemedProps } from './types';

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
    throw new Error('The `minWidth` or `maxWidth` should be set');
  }

  const minWidthRule = minWidth ? `(min-width: ${minWidth})` : '';
  const maxWidthRule = maxWidth ? `(max-width: ${maxWidth})` : '';

  return `@media only screen and ${minWidthRule}${minWidth && maxWidth ? ' and ' : ''}${maxWidthRule}`;
};

/**
 * Calculates the spacing value based on the provided spacing factor and spacing type.
 *
 * @param spacing The spacing factor to be applied.
 * @param type The type of spacing to be used, e.g., 'base', 'small', 'large'. Default: `base`.
 *
 * @returns The calculated spacing value.
 */
export const calculateSpacing =
  (spacing: number, type: keyof HoneySpacings = 'base') =>
  ({ theme }: HoneyThemedProps) =>
    spacing * (theme.spacings?.[type] ?? 0);
