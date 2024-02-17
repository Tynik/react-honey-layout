import React from 'react';
import type { PropsWithChildren } from 'react';

import type { HoneyLayoutGridColumnProps } from './HoneyGrid.types';
import { useCurrentHoneyGrid } from './HoneyGrid';
import { HoneyGridColumnStyled } from './HoneyGridColumnStyled';

export const HoneyGridColumn = ({
  children,
  ...props
}: PropsWithChildren<HoneyLayoutGridColumnProps>) => {
  const { columns, columnGrowing, spacing } = useCurrentHoneyGrid();

  return (
    <HoneyGridColumnStyled
      columns={columns}
      spacing={spacing}
      $flexGrow={columnGrowing ? 1 : 0}
      data-testid="honey-grid-column"
      {...props}
    >
      {children}
    </HoneyGridColumnStyled>
  );
};
