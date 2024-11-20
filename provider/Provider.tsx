import { ReactNode } from 'react';

import JotaiProvider from './JotaiProvider';

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <>
      <JotaiProvider>
        {children}
      </JotaiProvider>
    </>
  );
};