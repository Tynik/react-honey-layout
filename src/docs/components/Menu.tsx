import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import type { HoneyLayoutBoxProps } from '../../types';
import { HoneyBox } from '../../components';
import { PAGES } from '../constants';
import { useCurrentApp } from '../providers';
import { useBreakpoint } from '../../helpers';
import { useHoneyLayoutMediaQuery } from '../../hooks';

type MenuStyledProps = HoneyLayoutBoxProps & {
  isOpenMenu: boolean;
};

const MenuStyled = styled(HoneyBox)<MenuStyledProps>`
  ${({ isOpenMenu, theme }) => css`
    position: relative;

    display: flex;
    flex-shrink: 0;

    height: 100%;

    transition: all 200ms ease-in-out;
    background-color: ${theme.colors?.neutral.charcoalGray};
    overflow: hidden auto;

    ${isOpenMenu
      ? css`
          width: 300px;
          padding: 16px;
        `
      : css`
          width: 0;
          padding: 0;
        `}

    ${useBreakpoint('xs').down} {
      width: ${isOpenMenu && '100%'};
    }

    ${useBreakpoint('sm').down} {
      position: absolute;
    }

    ${useBreakpoint('xs').up} {
      border-right: 1px solid ${theme.colors?.neutral.charcoalDark};
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

    color: ${theme.colors?.neutral.lightBlue};

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;

export const Menu = () => {
  const screenState = useHoneyLayoutMediaQuery();

  const { isOpenMenu, toggleMenu } = useCurrentApp();

  const handleOnClickMenuItem = () => {
    if (screenState.isXs || screenState.isSm) {
      toggleMenu();
    }
  };

  return (
    <MenuStyled isOpenMenu={isOpenMenu}>
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
