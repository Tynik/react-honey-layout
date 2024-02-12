import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { HoneyBox } from '../../components';

const List = styled.ul`
  margin: 0;
  padding: 0;

  list-style-type: none;
`;

const ListItem = styled.li`
  ${({ theme }) => css`
    font-size: 18px;

    padding: 8px 16px;

    color: ${theme.colors?.neutral.lightBlue};
  `}
`;

export const Menu = () => {
  return (
    <HoneyBox
      $display={{ xs: 'none', md: 'flex' }}
      $width="300px"
      $height="calc(100% - 16px * 2)"
      $padding="16px"
      $flexShrink={0}
      $overflow="auto"
    >
      <List>
        <ListItem>
          <NavLink to="getting-started">Getting Started</NavLink>
        </ListItem>

        <ListItem>
          <NavLink to="honey-box">Honey Box</NavLink>
        </ListItem>
      </List>
    </HoneyBox>
  );
};
