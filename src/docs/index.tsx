import React from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle, css, ThemeProvider } from 'styled-components';

import type { HoneyLayoutTheme } from '../types';
import { App } from './App';
import { theme } from './theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends HoneyLayoutTheme {}
}

const GlobalStyle = createGlobalStyle`
  ${({ theme }) => css`
    html {
      background-color: ${theme.colors?.neutral.charcoalGray};
    }

    body {
      margin: 0;
      padding: 0;

      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-style: normal;
      line-height: 1.2rem;
    }

    html,
    body,
    #root {
      height: 100%;
      min-height: 100%;
    }
  `}
`;

const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>,
);
