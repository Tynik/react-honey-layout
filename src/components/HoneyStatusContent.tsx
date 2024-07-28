import React from 'react';
import type { PropsWithChildren } from 'react';

import type { HoneyStatusContentOptions } from '../types';

/**
 * A component that conditionally renders blocks based on specified boolean flags.
 */
export const HoneyStatusContent = ({
  children,
  isLoading = false,
  loadingBlockContent = null,
  isError = false,
  errorBlockContent = null,
  isNoContent = false,
  noContent = null,
}: PropsWithChildren<HoneyStatusContentOptions>) => {
  if (isError) {
    return errorBlockContent;
  }

  if (isNoContent) {
    return noContent;
  }

  return (
    <>
      {isLoading && loadingBlockContent}
      {children}
    </>
  );
};
