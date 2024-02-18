import React from 'react';
import { useTheme } from 'styled-components';

import { IconButton } from './IconButton';
import { MenuIcon } from '../icons';
import { HoneyBox } from '../../components';
import { useCurrentApp } from '../providers';

export const TopBar = () => {
  const theme = useTheme();

  const { toggleMenu } = useCurrentApp();

  return (
    <HoneyBox
      $display="flex"
      $padding="16px"
      $backgroundColor={theme.colors?.neutral.charcoalDark}
      $boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)"
      $zIndex={99}
      data-testid="top-bar"
    >
      <IconButton onClick={toggleMenu}>
        <MenuIcon $color="white" />
      </IconButton>
    </HoneyBox>
  );
};
