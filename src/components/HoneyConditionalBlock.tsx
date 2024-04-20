import React from 'react';
import type { PropsWithChildren, ReactNode } from 'react';

export type HoneyConditionalBlockProps = {
  /**
   * A flag indicating whether the component is in a loading state.
   *
   * @default false
   */
  isLoading?: boolean;
  /**
   * The content to display when the component is in a loading state.
   *
   * @default null
   */
  loadingBlockContent?: ReactNode;
  /**
   * A flag indicating whether the component has encountered an error.
   *
   * @default false
   */
  isError?: boolean;
  /**
   * The content to display when the component has encountered an error.
   *
   * @default null
   */
  errorBlockContent?: ReactNode;
  /**
   * A flag indicating whether the component has no content to display.
   *
   * @default false
   */
  isNoContent?: boolean;
  /**
   * The content to display when the component has no content to display.
   *
   * @default null
   */
  noContent?: ReactNode;
};

/**
 * A component that conditionally renders blocks based on specified boolean flags.
 */
export const HoneyConditionalBlock = ({
  children,
  isLoading = false,
  loadingBlockContent = null,
  isError = false,
  errorBlockContent = null,
  isNoContent = false,
  noContent = null,
}: PropsWithChildren<HoneyConditionalBlockProps>) => {
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
