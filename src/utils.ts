import type { HoneyCSSLengthValue } from './types';

export const camelToDashCase = (str: string) =>
  str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

export type HoneyCreateMediaRuleOptions = {
  operator?: 'not' | 'only';
  mediaType?: 'all' | 'print' | 'screen' | 'speech';
  minWidth?: HoneyCSSLengthValue;
  minHeight?: HoneyCSSLengthValue;
  maxWidth?: HoneyCSSLengthValue;
  maxHeight?: HoneyCSSLengthValue;
  orientation?: 'landscape' | 'portrait';
};

/**
 * Builds a media query string based on the provided options.
 *
 * @param {HoneyCreateMediaRuleOptions} options - Options for the media query.
 *
 * @returns {string} The generated media query string.
 */
export const buildMediaQuery = ({
  operator,
  mediaType = 'screen',
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  orientation,
}: HoneyCreateMediaRuleOptions): string => {
  const conditions = [
    minWidth && ['min-width', minWidth],
    maxWidth && ['max-width', maxWidth],
    minHeight && ['min-height', minHeight],
    maxHeight && ['max-height', maxHeight],
    orientation && ['orientation', orientation],
  ]
    .filter(Boolean)
    .map(r => r && `(${r[0]}: ${r[1]})`)
    .join(' and ');

  const operatorPart = operator ? `${operator} ` : '';
  const conditionsPart = conditions ? ` and ${conditions}` : '';

  return `@media ${operatorPart}${mediaType}${conditionsPart}`;
};
