import React from 'react';
import type { PropsWithChildren, ReactNode } from 'react';

export type HoneyConditionalBlockProps = {
  /** A flag indicating whether the component is in a loading state. */
  isLoading?: boolean;
  /** The content to display when the component is in a loading state. */
  loadingBlockContent?: ReactNode;
  /** A flag indicating whether the component has encountered an error. */
  isError?: boolean;
  /** The content to display when the component has encountered an error. */
  errorBlockContent?: ReactNode;
  /** A flag indicating whether the component has no content to display. */
  isNoContent?: boolean;
  /** The content to display when the component has no content to display. */
  noContent?: ReactNode;
};

/**
 * A component that conditionally renders blocks based on specified boolean flags.
 */
export const HoneyConditionalBlock = ({
  children,
  isLoading,
  loadingBlockContent,
  isError,
  errorBlockContent,
  isNoContent,
  noContent,
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
