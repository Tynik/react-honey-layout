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

  const sortedBreakpoints = Object.entries(breakpoints)
    .sort(([, a], [, b]) => a - b) // Sort breakpoints in ascending order of width
    .map(([name]) => name) as (keyof Partial<HoneyLayoutBreakpoints>)[];

  const currentBreakpoint =
    sortedBreakpoints.find(breakpoint => {
      const size = breakpoints[breakpoint];

      return size ? window.innerWidth < size : false;
    }) || sortedBreakpoints[sortedBreakpoints.length - 1]; // Use the largest breakpoint if no match is found

  return {
    isPortrait,
    isLandscape,
    isXs: currentBreakpoint === 'xs',
    isSm: currentBreakpoint === 'sm',
    isMd: currentBreakpoint === 'md',
    isLg: currentBreakpoint === 'lg',
    isXl: currentBreakpoint === 'xl',
  };
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
