import React from 'react';
import styled, { css, useTheme } from 'styled-components';

import { HoneyBox } from '../components';
import { MDXWrapper, HoneyContainer, DemoContainer } from './components';

import HoneyBoxPage from './pages/honey-box.page.mdx';

const SquareHoneyBox = styled(HoneyBox)``;

SquareHoneyBox.defaultProps = {
  $width: '100px',
  $height: '100px',
};

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

export const App = () => {
  const theme = useTheme();

  return (
    <HoneyBox $display="flex" $height="100%" $alignItems="flex-start" $overflow="hidden">
      <HoneyBox
        $display={{ xs: 'none', md: 'flex' }}
        $width="300px"
        $height="calc(100% - 16px * 2)"
        $padding="16px"
        $flexShrink={0}
        $overflow="auto"
      >
        <List>
          <ListItem>test 1</ListItem>
          <ListItem>test 2</ListItem>
        </List>
      </HoneyBox>

      <HoneyBox $display="flex" $height="100%" $flexGrow={1} $overflow="auto">
        <HoneyContainer>
          <HoneyBoxPage components={{ wrapper: MDXWrapper }} />

          <DemoContainer>
            {Array.from(new Array(50)).map((_, index) => (
              <SquareHoneyBox
                key={index}
                $backgroundColor={{
                  xs: 'white',
                  sm: theme.colors?.neutral.forestGreen,
                  md: theme.colors?.neutral.crimsonRed,
                }}
              />
            ))}
          </DemoContainer>
        </HoneyContainer>
      </HoneyBox>
    </HoneyBox>
  );
};
