import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import theme, { GlobalStyle } from './theme';
import Navtop from './components/Navtop';
import Intro from './components/Intro';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
// Importando i18n
import './i18n';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const LanguageSwitcher = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  &:focus {
    outline: none;
  }
`;

function App() {
  const { t, i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'pt-BR' ? 'en' : 'pt-BR';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Navtop />
        <Intro />
        <About />
        <Projects />
        <Contact />
        <Footer />
        <LanguageSwitcher onClick={toggleLanguage} title={t('general.changeLanguage')}>
          <FontAwesomeIcon icon={faLanguage} size="lg" />
        </LanguageSwitcher>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
