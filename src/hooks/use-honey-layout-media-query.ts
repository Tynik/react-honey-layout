import { useTheme } from 'styled-components';
import { useEffect, useState } from 'react';

import type { HoneyLayoutBreakpoints } from '../types';

type ScreenState = {
  isPortrait: boolean;
  isLandscape: boolean;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
};

const getScreenState = (breakpoints: Partial<HoneyLayoutBreakpoints> | undefined): ScreenState => {
  const isPortrait = window.innerHeight > window.innerWidth;
  const isLandscape = !isPortrait;

  if (!breakpoints) {
    return {
      isPortrait,
      isLandscape,
      isXs: false,
      isSm: false,
      isMd: false,
      isLg: false,
      isXl: false,
    };
  }

  // Get the keys of the provided breakpoints
  const breakpointKeys = Object.keys(breakpoints) as (keyof Partial<HoneyLayoutBreakpoints>)[];

  // Find the first breakpoint that matches the current screen width
  const currentBreakpoint = breakpointKeys.findLast(breakpoint => {
    const breakpointConfig = breakpoints[breakpoint];

    return (
      (!breakpointConfig?.minWidth || window.innerWidth >= (breakpointConfig?.minWidth ?? 0)) &&
      (!breakpointConfig?.maxWidth || window.innerWidth <= (breakpointConfig?.maxWidth ?? 0))
    );
  });

  // Initialize screen state with default values
  const screenState: ScreenState = {
    isPortrait,
    isLandscape,
    isXs: false,
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
  };

  // Update screen state based on the current breakpoint
  if (currentBreakpoint) {
    switch (currentBreakpoint) {
      case 'xs':
        screenState.isXs = true;
        break;
      case 'sm':
        screenState.isSm = true;
        break;
      case 'md':
        screenState.isMd = true;
        break;
      case 'lg':
        screenState.isLg = true;
        break;
      case 'xl':
        screenState.isXl = true;
        break;
      default:
    }
  }

  return screenState;
};

export const useHoneyLayoutMediaQuery = () => {
  const theme = useTheme();

  const [screenState, setScreenState] = useState<ScreenState>(getScreenState(theme.breakpoints));

  useEffect(() => {
    const handleResize = () => {
      setScreenState(getScreenState(theme.breakpoints));
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenState;
};
