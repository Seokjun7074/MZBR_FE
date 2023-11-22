import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
    }
    html {
        font-size: 62.5%;
    }
    body {
        overflow-x: hidden;
        font-size: 1.6rem;
        font-family: 'Pretendard-Regular', 'Open Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    input,
    select,
    button {
        background: none;
        border: none;
        font-size: inherit;
        color: inherit;
        &:focus {
        outline: none;
        }
        &:disabled {
        cursor: not-allowed;
        }
    }
    a,
    button {
        cursor: pointer;
        text-decoration: none;
        outline: none;
    }
`;
export default GlobalStyle;
