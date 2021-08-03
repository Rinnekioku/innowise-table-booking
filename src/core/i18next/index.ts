import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en';
import ru from './translations/ru';

export default function(lng: string): any {
    i18n
        .use(initReactI18next)
        .init({
            resources: {
                en: en,
                ru: ru,
            },
            lng: lng,
            fallbackLng: 'en',

            interpolation: {
                escapeValue: false
            }
        });
}
