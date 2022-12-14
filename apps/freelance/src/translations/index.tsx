import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './en';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: typeof en;
  }
}

const resources = {
  en,
};

i18n.use(initReactI18next).use(LanguageDetector).init({
  resources,
  defaultNS: 'translation',
  fallbackLng: 'en',
});

export default i18n;
