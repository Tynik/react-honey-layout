import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { PAGES } from '../constants';
import { useCurrentApp } from '../providers';
import { getBreakpointMediaQuery } from '../../helpers';
import { useHoneyMediaQuery } from '../../hooks';

type MenuStyledProps = {
  $isOpenMenu: boolean;
};

const MenuStyled = styled.div<MenuStyledProps>`
  ${({ $isOpenMenu, theme }) => css`
    position: relative;

    display: flex;
    flex-shrink: 0;

    height: 100%;

    transition: all 200ms ease-in-out;
    background-color: ${theme.colors.neutral.charcoalGray};
    overflow: hidden auto;

    ${$isOpenMenu
      ? css`
          width: 300px;
          padding: 16px;
        `
      : css`
          width: 0;
          padding: 0;
        `}

    ${getBreakpointMediaQuery('xs').down} {
      width: ${$isOpenMenu && '100%'};
    }

    ${getBreakpointMediaQuery('sm').down} {
      position: absolute;
      z-index: 999;
    }

    ${getBreakpointMediaQuery('xs').up} {
      border-right: 1px solid ${theme.colors.neutral.charcoalDark};
    }
  `}
`;

const List = styled.ul`
  margin: 0;
  padding: 0;

  list-style-type: none;
  overflow: hidden;
`;

const ListItem = styled.li`
  ${({ theme }) => css`
    font-size: 18px;

    padding: 8px 16px;

    color: ${theme.colors.neutral.lightBlue};

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;

export const Menu = () => {
  const screenState = useHoneyMediaQuery();

  const { isOpenMenu, toggleMenu } = useCurrentApp();

  const handleOnClickMenuItem = () => {
    if (screenState.isXs || screenState.isSm) {
      toggleMenu();
    }
  };

  return (
    <MenuStyled $isOpenMenu={isOpenMenu}>
      <List>
        {PAGES.map(page => (
          <ListItem key={page.path}>
            <NavLink onClick={handleOnClickMenuItem} to={page.path}>
              {page.menuLabel}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </MenuStyled>
  );
};
