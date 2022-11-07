import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          description: {
            'root page': 'This is root route',
            'Welcome to React': 'Welcome to React and react-i18next',
            'reusable component': 'This is the example of reusable component.',
            'pink circle': "I'm a pink circle!",
            'orange circle': "I'm a orange circle!",
            'yellow circle': "I'm a yellow circle!",
            'profile p1 completion per': '20% completed',
            'profile p2 completion per': '50% completed',
          },
          redux: {
            'redux-hook-form': 'This is the example of redux-hook-form',
            pokemon: 'We invited <0>{user}</0>.',
          },
          router: {
            toPage2: 'Click here for page 2.',
            toRoot: 'Click here to go back to root page.',
            toProfileQuestions1: 'Create portfolio',
            toProfileQuestions2: 'Continue',
          },
        },
      },
    },
  });

export default i18n;
