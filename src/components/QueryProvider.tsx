"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react';
type QueryProviderProps = {
    children: React.ReactNode
};

export const QueryProvider = ({children}: QueryProviderProps) => {
  const [queryClient] = useState(() => new QueryClient())
  /* 
  Using useState this way (for having this Component in root layout only),
  emulates the behaviour of a singleton, ensuring the QueryClient is the same across renders
  this is required for nextJS apps, because a normal react app the component tree is mounted only once,
  but on nextjs, first there is rendering on the server then on the client, that would make the QueryCLient lose the server fetch cache if we would initiate the normal way
  */
  return (
    <QueryClientProvider client={queryClient}>
{children}
    </QueryClientProvider>
  );
};