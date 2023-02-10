import i18n from 'i18n-js'
import { I18nManager, NativeModules, Platform } from 'react-native'

export * from './isRTL'

export const LANGUAGES = [
  {
    label: '日本語',
    value: 'ja',
    file: require('./locales/ja').default,
  },
  {
    label: 'English',
    value: 'en',
    file: require('./locales/en').default,
  },
]

const translations = LANGUAGES.reduce((ret, item) => {
  ret[item.value] = item.file
  return ret
}, {})

i18n.translations = translations
i18n.fallbacks = true

const defaultLanguage = { languageTag: 'en', isRTL: false }
const { languageTag, isRTL } = defaultLanguage

I18nManager.forceRTL(isRTL)
I18nManager.swapLeftAndRightInRTL(isRTL)
//i18n.locale = languageTag;
const locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier
i18n.locale = locale?.indexOf('ja') > -1 ? 'ja' : defaultLanguage.languageTag
i18n.isRTL = I18nManager.isRTL

export default i18n
