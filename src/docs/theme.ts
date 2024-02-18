import type { HoneyLayoutTheme } from '../types';

export const theme: HoneyLayoutTheme = {
  breakpoints: {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200,
  },
  container: {
    maxWidth: '1450px',
  },
  spacing: {
    nominal: 8,
  },
  colors: {
    primary: {},
    secondary: {},
    accent: {},
    neutral: {
      charcoalDark: '#222222',
      charcoalGray: '#333333',
      crimsonRed: '#DC143C',
      coralRed: '#FF4D4D',
      forestGreen: '#228B22',
      royalBlue: '#4169E1',
      goldenrod: '#DAA520',
      slateBlue: '#6A5ACD',
      mauve: '#E0B0FF',
      // Text
      white: '#FFFFFF',
      lightBlue: '#ADD8E6',
      lightGray: '#CCCCCC',
      beige: '#F5F5DC',
      cream: '#FFFDD0',
      paleYellow: '#FFFFE0',
      paleGreen: '#98FB98',
    },
    success: {},
    warning: {},
    error: {},
  },
};
