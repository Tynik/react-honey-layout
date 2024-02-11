import React from 'react';
import type { PropsWithChildren } from 'react';
import styled, { css, useTheme } from 'styled-components';

import { HoneyBox } from '../components';
import { useHoneyLayoutMediaQuery } from '../hooks';
import { HoneyLayoutBreakpointName } from '../types';

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
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 18px;

    padding: 8px 16px;

    color: ${theme.colors?.neutral.lightBlue};
  `}
`;

const HoneyContainer = styled(HoneyBox)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    margin: 0 auto;
    max-width: ${theme.container?.maxWidth};

    padding: 16px;
  `}
`;

const StyledDemoContainer = styled(HoneyBox)`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    padding: 8px;

    border: 1px solid #cccccc;
    border-radius: 4px;
  `}
`;

const DemoContainer = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  const screenState = useHoneyLayoutMediaQuery();

  const getBreakpointInfo = (breakpoint: HoneyLayoutBreakpointName) => {
    const breakpointConfig = theme.breakpoints?.[breakpoint];

    return `${breakpoint}[${breakpointConfig?.minWidth ? `>=${breakpointConfig.minWidth}` : ''}${breakpointConfig?.maxWidth ? `<=${breakpointConfig.maxWidth}` : ''}]`;
  };

  return (
    <>
      <HoneyBox
        $display="flex"
        $gap="8px"
        $margin="0 auto"
        $color={theme.colors?.neutral.goldenrod}
      >
        <span>
          {getBreakpointInfo('xs')}: {screenState.isXs.toString()}
        </span>
        <span>
          {getBreakpointInfo('sm')}: {screenState.isSm.toString()}
        </span>
        <span>
          {getBreakpointInfo('md')}: {screenState.isMd.toString()}
        </span>
        <span>
          {getBreakpointInfo('lg')}: {screenState.isLg.toString()}
        </span>
        <span>
          {getBreakpointInfo('xl')}: {screenState.isXl.toString()}
        </span>
      </HoneyBox>

      <StyledDemoContainer $marginTop="4px">{children}</StyledDemoContainer>
    </>
  );
};

export const App = () => {
  const theme = useTheme();

  return (
    <HoneyBox $display="flex" $height="100%" $alignItems="flex-start">
      <HoneyBox
        $display={{ xs: 'none', md: 'block' }}
        $width="300px"
        $height="100%"
        $padding="16px"
        $flexShrink={0}
      >
        <List>
          <ListItem>test 1</ListItem>
          <ListItem>test 2</ListItem>
        </List>
      </HoneyBox>

      <HoneyContainer>
        <DemoContainer>
          {Array.from(new Array(100)).map((_, index) => (
            <SquareHoneyBox
              key={index}
              $backgroundColor={{
                xs: 'white',
                sm: theme.colors?.neutral.forestGreen,
                md: theme.colors?.neutral.crimsonRed,
              }}
            >
              Box
            </SquareHoneyBox>
          ))}
        </DemoContainer>
      </HoneyContainer>
    </HoneyBox>
  );
};
