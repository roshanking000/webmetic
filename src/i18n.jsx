import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('language') === null ? "de" : localStorage.getItem('language'),
    fallbackLng: localStorage.getItem('language') === null ? "de" : localStorage.getItem('language'),
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}.json", // Path to your locale JSON files
    },
  });

export default i18n;
