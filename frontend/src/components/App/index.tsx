import { ReactNode } from 'react';
import { ReduxProvider } from './ReduxProvider/ReduxProvider';

export function App({ children }: { children: ReactNode }) {
    return (
      <ReduxProvider>
        {children}
      </ReduxProvider>
    );
  }