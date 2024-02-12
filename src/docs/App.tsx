import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { HoneyBox } from '../components';
import { MDXWrapper, HoneyContainer, Menu } from './components';

import GettingStartedPage from './pages/getting-started.page.mdx';
import HoneyBoxPage from './pages/honey-box.page.mdx';

const SquareHoneyBox = styled(HoneyBox)``;

SquareHoneyBox.defaultProps = {
  $width: '100px',
  $height: '100px',
};

export const App = () => {
  return (
    <HoneyBox $display="flex" $height="100%" $alignItems="flex-start" $overflow="hidden">
      <Menu />

      <HoneyBox $display="flex" $height="100%" $flexGrow={1} $overflow="auto">
        <HoneyContainer>
          <Routes>
            <Route
              path="getting-started"
              element={<GettingStartedPage components={{ wrapper: MDXWrapper }} />}
            />
            <Route
              path="honey-box"
              element={<HoneyBoxPage components={{ wrapper: MDXWrapper }} />}
            />
          </Routes>
        </HoneyContainer>
      </HoneyBox>
    </HoneyBox>
  );
};
