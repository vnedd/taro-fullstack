import React from "react";
import {
  QueryClient,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";

interface QueryClientProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});
const QueryClientProvider = ({ children }: QueryClientProviderProps) => {
  return <Provider client={queryClient}>{children}</Provider>;
};

export default QueryClientProvider;
