import React from 'react';
import type { MDXComponents } from 'mdx/types';

import type { Page } from './types';
import { MDXWrapper } from './components/MDXWrapper';

import GettingStartedPage from './pages/getting-started.page.mdx';
import ThematizationPage from './pages/thematization.page.mdx';
import HoneyBoxPage from './pages/honey-box.page.mdx';
import HoneyGridPage from './pages/honey-grid.page.mdx';
import HoneyListPage from './pages/honey-list.page.mdx';
import HoneyLazyContentPage from './pages/honey-lazy-content.page.mdx';
import UtilitiesPage from './pages/utilities.page.mdx';

const MDX_COMPONENTS: MDXComponents = { wrapper: MDXWrapper };

export const PAGES: Page[] = [
  {
    path: 'getting-started',
    menuLabel: 'Getting Started',
    element: <GettingStartedPage components={MDX_COMPONENTS} />,
  },
  {
    path: 'thematization',
    menuLabel: 'Thematization',
    element: <ThematizationPage components={MDX_COMPONENTS} />,
  },
  {
    path: 'box',
    menuLabel: 'Box',
    element: <HoneyBoxPage components={MDX_COMPONENTS} />,
  },
  {
    path: 'lazy-content',
    menuLabel: 'Lazy Content',
    element: <HoneyLazyContentPage components={MDX_COMPONENTS} />,
  },
  {
    path: 'grid',
    menuLabel: 'Grid',
    element: <HoneyGridPage components={MDX_COMPONENTS} />,
  },
  {
    path: 'list',
    menuLabel: 'List',
    element: <HoneyListPage components={MDX_COMPONENTS} />,
  },
  {
    path: 'utilities',
    menuLabel: 'Utilities',
    element: <UtilitiesPage components={MDX_COMPONENTS} />,
  },
];
