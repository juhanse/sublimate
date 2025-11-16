import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from '@/locales/en.json';
import fr from '@/locales/fr.json';

const userLocale = Localization.getLocales()[0]?.languageCode || 'en';
const language = userLocale.startsWith('fr') ? 'fr' : 'en';

i18next.use(initReactI18next).init({
	compatibilityJSON: 'v4',
	lng: language,
	fallbackLng: 'en',
	resources: {
		en: { translation: en },
		fr: { translation: fr }
	},
	interpolation: { escapeValue: false },
});

export default i18next;
