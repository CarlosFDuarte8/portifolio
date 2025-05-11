import { createGlobalStyle, DefaultTheme } from 'styled-components';

// Definição do tema com todas as cores e tamanhos usados no aplicativo
const theme: DefaultTheme = {
  colors: {
    primary: '#007bff',
    primaryDark: '#0056b3',
    secondary: '#6c757d',
    dark: '#343a40',
    light: '#f8f9fa',
    white: '#ffffff',
    black: '#000000',
    gray: '#6c757d'
  },
  fonts: {
    primary: "'Roboto', sans-serif",
    secondary: "'Montserrat', sans-serif"
  },
  fontSizes: {
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
    xlarge: '1.5rem',
    xxlarge: '2rem',
    hero: '3.5rem'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '3rem',
    xxl: '6rem'
  },
  borderRadius: {
    small: '0.25rem',
    medium: '0.5rem',
    large: '1rem',
    circle: '50%'
  },
  boxShadow: {
    small: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
    medium: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
    large: '0 1rem 3rem rgba(0, 0, 0, 0.175)'
  },
  transitions: {
    fast: '0.3s',
    medium: '0.5s',
    slow: '0.7s'
  },
  breakpoints: {
    xs: '0',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  }
};

// Estilos globais para o aplicativo inteiro
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.fonts.primary};
    font-size: ${theme.fontSizes.medium};
    line-height: 1.6;
    color: ${theme.colors.dark};
    background-color: ${theme.colors.light};
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.secondary};
    font-weight: 700;
    margin-bottom: ${theme.spacing.md};
  }

  a {
    text-decoration: none;
    color: ${theme.colors.primary};
    transition: color ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.primaryDark};
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  section {
    padding: ${theme.spacing.xxl} 0;
  }

  p {
    margin-bottom: ${theme.spacing.md};
  }

  button, input, textarea {
    font-family: ${theme.fonts.primary};
  }
`;

export default theme;