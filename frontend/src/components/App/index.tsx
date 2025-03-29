import { ReactNode } from 'react';
import { ReduxProvider } from './ReduxProvider/ReduxProvider';
import { QueryProvider } from './QueryProvider/QueryProvider';

export function App({ children }: { children: ReactNode }) {
    return (
      <QueryProvider>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </QueryProvider>
    );
  }