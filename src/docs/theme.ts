import type { HoneyLayoutTheme } from '../types';

export const theme: HoneyLayoutTheme = {
  breakpoints: {
    xs: {
      minWidth: 320,
    },
    sm: {
      minWidth: 700,
    },
    md: {
      minWidth: 1200,
    },
    lg: {
      minWidth: 1600,
    },
  },
  container: {
    maxWidth: '1450px',
  },
  spacing: {},
  colors: {
    primary: {},
    secondary: {},
    accent: {},
    neutral: {
      charcoalGray: '#333333',
      crimsonRed: '#DC143C',
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
