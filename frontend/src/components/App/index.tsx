'use client'

import { ReactNode } from 'react';
import { ReduxProvider } from './ReduxProvider/ReduxProvider';
import { ContextProvider } from './ContextProvider/ContextProvider';
import { useContext } from './ContextProvider/useContext';

function InnerApp({ children }: { children: ReactNode }) {
  const context = useContext();

  return (
    <ContextProvider {...context}>
      {children}
    </ContextProvider>
  );
}

export function App({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <InnerApp>
        {children}
      </InnerApp>
    </ReduxProvider>
  );
}