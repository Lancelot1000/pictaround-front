import JotaiProvider from './JotaiProvider';
import { ReactNode } from 'react';

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <>
      <JotaiProvider>
        {children}
      </JotaiProvider>
    </>
  );
};