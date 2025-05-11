import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en.json';
import translationPTBR from './locales/pt-br.json';

// Os recursos de idiomas disponíveis
const resources = {
  en: {
    translation: translationEN
  },
  'pt-BR': {
    translation: translationPTBR
  }
};

i18n
  // Detecta o idioma do usuário automaticamente
  .use(LanguageDetector)
  // Passa o objeto i18n para o react-i18next
  .use(initReactI18next)
  // Inicializa i18next
  .init({
    resources,
    fallbackLng: 'pt-BR', // Idioma de fallback
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // React já escapa por padrão
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;