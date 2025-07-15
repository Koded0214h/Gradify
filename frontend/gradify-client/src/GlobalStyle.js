import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    transition: background 0.2s, color 0.2s;
  }
`;

export default GlobalStyle; 