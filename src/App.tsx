import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import theme, { GlobalStyle } from './theme';
import Navtop from './components/Navtop';
import Intro from './components/Intro';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Navtop />
        <Intro />
        <About />
        <Contact />
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
