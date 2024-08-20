'use client'

import { Cookie } from '@/services'
import Config from '@/services/Config.service'
import { Locales } from '@/types/locales'
import { createContext, ReactNode, useEffect, useState } from 'react'
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
  const [locale, setLocale] = useState<string>(Locales.en)

  const t = (key: string) => translationsMap[locale]?.[key] || key
  const changeLocale = (newLocale: string) => {
    setLocale(newLocale)
    Cookie.set(Config.locale, newLocale)
  }

  useEffect(() => {
    setLocale(Cookie.get(Config.locale) || Locales.en)
  }, [])

  return <LanguageContext.Provider value={{ changeLocale, t }}>{children}</LanguageContext.Provider>
}
