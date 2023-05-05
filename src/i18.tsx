import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// translation files
import en from '../public/locales/en/translation.json';
import ua from '../public/locales/ua/translation.json';
import ru from '../public/locales/ru/translation.json';

const resources = {
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

i18next.use(initReactI18next).init({ resources, lng: 'en' });

export default i18next;
