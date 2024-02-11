import React from 'react';
import type { PropsWithChildren } from 'react';
import styled, { css, useTheme } from 'styled-components';

import type { HoneyLayoutBreakpointName } from '../../types';
import { HoneyBox } from '../../components';
import { useHoneyLayoutMediaQuery } from '../../hooks';

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

export const DemoContainer = ({ children }: PropsWithChildren) => {
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
        $flexWrap="wrap"
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
