import React from 'react';
import type { MDXComponents } from 'mdx/types';

import type { Page } from './types';
import { MDXWrapper } from './components/MDXWrapper';

import GettingStartedPage from './pages/getting-started.page.mdx';
import HoneyBoxPage from './pages/honey-box.page.mdx';

const MDX_COMPONENTS: MDXComponents = { wrapper: MDXWrapper };

export const PAGES: Page[] = [
  {
    path: 'getting-started',
    menuLabel: 'Getting Started',
    element: <GettingStartedPage components={MDX_COMPONENTS} />,
  },
  {
    path: 'honey-box',
    menuLabel: 'Honey Box',
    element: <HoneyBoxPage components={MDX_COMPONENTS} />,
  },
];
