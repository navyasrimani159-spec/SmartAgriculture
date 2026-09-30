import { LanguageCode, LanguageOption } from '../types';
import { en, TranslationKeys } from './en';
import { hi } from './hi';
import { ta } from './ta';
import { te } from './te';
import { kn } from './kn';
import { ml } from './ml';
import { bn } from './bn';
import { mr } from './mr';
import { gu } from './gu';
import { pa } from './pa';
import { as } from './as';
import { or } from './or';

export const supportedLanguages: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
  { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી' },
  { code: 'pa', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ' },
  { code: 'as', label: 'Assamese', nativeLabel: 'অসমীয়া' },
  { code: 'or', label: 'Odia', nativeLabel: 'ଓଡ଼ିଆ' }
];

const translations: Record<LanguageCode, Record<TranslationKeys, string>> = {
  en,
  hi,
  ta,
  te,
  kn,
  ml,
  bn,
  mr,
  gu,
  pa,
  as,
  or
};

export function getTranslation(lang: LanguageCode, key: TranslationKeys): string {
  const langDict = translations[lang] || translations.en;
  return langDict[key] || en[key] || key;
}

export { en };
export type { TranslationKeys };


