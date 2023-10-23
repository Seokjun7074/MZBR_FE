import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import GlobalStyle from '@/styles/globalStyle';
import AppRouter from '@/router/AppRouter';

const root = createRoot(document.querySelector('#root') as Element);
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <AppRouter />
  </ThemeProvider>,
);
