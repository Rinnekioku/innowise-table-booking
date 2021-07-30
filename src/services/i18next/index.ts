import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en';
import ru from './translations/ru';

export default function(): void {
    i18n
        .use(initReactI18next)
        .init({
            resources: {
                en: en,
                ru: ru,
            },
            lng: 'ru',
            fallbackLng: 'en',

            interpolation: {
                escapeValue: false
            }
        });
}
