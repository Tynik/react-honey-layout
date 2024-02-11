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
      lightBlue: '#ADD8E6',
    },
    success: {},
    warning: {},
    error: {},
  },
};

// White (#FFFFFF): White text offers the highest contrast against a Charcoal Gray background, ensuring excellent readability.
//   Light Gray (#CCCCCC): A slightly lighter shade of gray provides good contrast while maintaining a subdued look.
// Cream (#FFFDD0): A warm cream color provides a softer alternative to white while still offering good contrast.
// Beige (#F5F5DC): A light beige color complements the Charcoal Gray background and creates a calm and neutral aesthetic.
//   Pale Yellow (#FFFFE0): A pale yellow color adds warmth to the text and contrasts nicely with Charcoal Gray.
//   Pale Green (#98FB98): A light green color offers a subtle pop of color and contrasts well with Charcoal Gray.
