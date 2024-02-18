import React, { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { MDXProvider } from '@mdx-js/react';
import { createGlobalStyle, css } from 'styled-components';

import type { HoneyLayoutTheme } from '../types';
import { App } from './App';
import { theme } from './theme';
import { HoneyThemeProvider } from '../components';

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

    a,
    a:hover,
    a:focus,
    a:active {
      text-decoration: none;
      color: inherit;
    }

    html {
      box-sizing: border-box;
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }

    pre {
      border-radius: 4px;
      overflow: hidden;
    }

    code {
      padding: 4px 8px;
      border-radius: 4px;

      background-color: #22272e;
    }

    #root {
      display: flex;
      flex-direction: column;
    }
  `}
`;

const root = createRoot(document.getElementById('root') as HTMLDivElement);

const router = createBrowserRouter([
  {
    path: '/*',
    element: (
      <StrictMode>
        <App />
      </StrictMode>
    ),
  },
]);

root.render(
  <HoneyThemeProvider theme={theme}>
    <GlobalStyle />

    <MDXProvider>
      <RouterProvider router={router} />
    </MDXProvider>
  </HoneyThemeProvider>,
);
