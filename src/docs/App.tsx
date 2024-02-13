import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { HoneyBox } from '../components';
import { HoneyContainer, Menu } from './components';
import { PAGES } from './constants';

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
            {PAGES.map(page => (
              <Route key={page.path} path={page.path} element={page.element} />
            ))}

            <Route path="*" element={<Navigate to={PAGES[0].path} replace />} />
          </Routes>
        </HoneyContainer>
      </HoneyBox>
    </HoneyBox>
  );
};
