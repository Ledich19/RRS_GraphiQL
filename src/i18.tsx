import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import ua from './locales/ua/translation.json';
import ru from './locales/ru/translation.json';

export const resources = {
  en: {
    translation: en,
  },
  ua: {
    translation: ua,
  },
  ru: {
    translation: ru,
  },
};

i18next.use(initReactI18next).init({ resources, lng: 'en', returnNull: false });

export default i18next;
