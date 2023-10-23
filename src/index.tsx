import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import GlobalStyle from '@/styles/globalStyle';

const root = createRoot(document.querySelector('#root') as Element);
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>,
);
