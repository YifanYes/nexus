'use client'

import { createContext, ReactNode, useState } from 'react'
import enTranslations from '../../public/locales/en.json'
import esTranslations from '../../public/locales/es.json'

const translationsMap: Record<string, Record<string, string>> = {
  es: esTranslations,
  en: enTranslations
}

// Define the shape of the context data
interface LanguageContextProps {
  locale: string
  changeLocale: (newLocale: string) => void
  t: (key: string) => string
}

// Create the context with a default value
export const LanguageContext = createContext<LanguageContextProps>({
  locale: 'es',
  changeLocale: () => {},
  t: (key: string) => key
})

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Initialize locale based on the browser language
  const [locale, setLocale] = useState<string>(navigator.language.split('-')[0] || 'es')

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale)
  }

  const t = (key: string) => {
    return translationsMap[locale]?.[key] || key
  }

  return <LanguageContext.Provider value={{ locale, changeLocale, t }}>{children}</LanguageContext.Provider>
}
