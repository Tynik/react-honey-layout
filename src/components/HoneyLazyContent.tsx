import { useEffect, useRef, useState } from 'react';

import type { PropsWithChildren } from 'react';
import type { TimeoutId } from '../types';

type HoneyLazyContentProps = {
  /**
   * Determines whether the content should be mounted or unmounted.
   */
  mount: boolean;
  /**
   * The delay in milliseconds before unmounting the content when `mount` is set to `false`.
   */
  unmountDelay: number;
  /**
   * Determines whether the content should always remain mounted, regardless of the value of `mount`.
   * If `true`, the content will never be unmounted.
   *
   * @default false
   */
  alwaysMounted?: boolean;
  /**
   * Determines whether the content should remain mounted after the first mount.
   * If `true`, the content will not be unmounted after the first time it's mounted.
   *
   * @default false
   */
  keepAfterMount?: boolean;
};

/**
 * Component for lazy loading and unloading content based on a mount/unmount state.
 */
export const HoneyLazyContent = ({
  children,
  mount,
  unmountDelay,
  alwaysMounted = false,
  keepAfterMount = false,
}: PropsWithChildren<HoneyLazyContentProps>) => {
  const [isMountContent, setIsMountContent] = useState(alwaysMounted || mount);

  const mountContentTimeoutIdRef = useRef<TimeoutId | undefined>(undefined);

  useEffect(() => {
    if (!mount || alwaysMounted) {
      return;
    }

    clearTimeout(mountContentTimeoutIdRef.current);

    setIsMountContent(true);

    return () => {
      if (!keepAfterMount) {
        mountContentTimeoutIdRef.current = setTimeout(() => setIsMountContent(false), unmountDelay);
      }
    };
  }, [mount]);

  return isMountContent ? children : null;
};
