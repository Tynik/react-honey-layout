import React, { createContext, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';

import type { HoneyGridStyledProps } from './HoneyGrid.styled';
import { HoneyGridStyled } from './HoneyGrid.styled';

type HoneyGridContextValue = {
  columns: number;
  columnGrowing: boolean;
  spacing: number | undefined;
};

const HoneyGridContext = createContext<HoneyGridContextValue | undefined>(undefined);

export type HoneyGridProps = HoneyGridStyledProps & {
  /**
   * The number of columns in the grid layout.
   */
  columns: number;
  /**
   * Specifies whether columns should grow to fill available space.
   *
   * @default true
   */
  columnGrowing?: boolean;
};

export const HoneyGrid = ({
  children,
  columns,
  columnGrowing = true,
  spacing,
  ...props
}: PropsWithChildren<HoneyGridProps>) => {
  const contextValue = useMemo<HoneyGridContextValue>(
    () => ({
      columns,
      columnGrowing,
      spacing,
    }),
    [columns, columnGrowing, spacing],
  );

  return (
    <HoneyGridContext.Provider value={contextValue}>
      <HoneyGridStyled spacing={spacing} data-testid="honey-grid" {...props}>
        {children}
      </HoneyGridStyled>
    </HoneyGridContext.Provider>
  );
};

export const useCurrentHoneyGrid = () => {
  const context = useContext(HoneyGridContext);
  if (!context) {
    throw new Error(
      'The `useCurrentHoneyGrid()` hook can only be used inside <HoneyGrid/> component!',
    );
  }

  return context;
};
