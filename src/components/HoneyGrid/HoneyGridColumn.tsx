import React from 'react';
import type { PropsWithChildren } from 'react';

import type { HoneyGridColumnProps } from './HoneyGrid.types';
import { useCurrentHoneyGrid } from './HoneyGrid';
import { HoneyGridColumnStyled } from './HoneyGridColumn.styled';

export const HoneyGridColumn = ({
  children,
  ...props
}: PropsWithChildren<HoneyGridColumnProps>) => {
  const { columns, columnGrowing, spacing } = useCurrentHoneyGrid();

  return (
    <HoneyGridColumnStyled
      columns={columns}
      spacing={spacing}
      $flexGrow={columnGrowing ? 1 : 0}
      // Data
      data-testid="honey-grid-column"
      {...props}
    >
      {children}
    </HoneyGridColumnStyled>
  );
};
