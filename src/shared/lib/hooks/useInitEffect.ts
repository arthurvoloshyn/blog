import { useEffect } from 'react';

export const useInitEffect = (cb: () => void) => {
  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      cb();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
