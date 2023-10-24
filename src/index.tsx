import { ThemeProvider } from 'styled-components';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RecoilRoot } from 'recoil';

import AppRouter from '@/router/AppRouter';
import GlobalStyle from '@/styles/globalStyle';
import { theme } from '@/styles/theme';

const root = createRoot(document.querySelector('#root') as Element);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      // suspense: true,
      // useErrorBoundary: true,
    },
  },
});

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <GlobalStyle />
          <AppRouter />
        </RecoilRoot>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
