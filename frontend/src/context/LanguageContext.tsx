'use client'

import { Cookie } from '@/services'
import Config from '@/services/Config.service'
import { createContext, ReactNode, useEffect } from 'react'
import enTranslations from '../../public/locales/en.json'
import esTranslations from '../../public/locales/es.json'

const translationsMap: Record<string, Record<string, string>> = {
  es: esTranslations,
  en: enTranslations
}

// Define the shape of the context data
interface LanguageContextProps {
  changeLocale: (newLocale: string) => void
  t: (key: string) => string
}

// Create the context with a default value
export const LanguageContext = createContext<LanguageContextProps>({
  changeLocale: () => {},
  t: (key: string) => key
})

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const changeLocale = (newLocale: string) => Cookie.set(Config.locale, newLocale)

  const t = (key: string) => translationsMap[Cookie.get(Config.locale) || 'en']?.[key] || key

  useEffect(() => {
    if (Cookie.get(Config.locale)) {
      return
    }
    changeLocale(navigator.language.split('-')[0])
  }, [])

  return <LanguageContext.Provider value={{ changeLocale, t }}>{children}</LanguageContext.Provider>
}
