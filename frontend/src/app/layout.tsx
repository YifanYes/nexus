import AuthProvider from '@/context/AuthContext'
import '@/styles/globals.css'
import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { absolute: '', default: 'Nexus', template: '%s - Nexus' },
  description: 'The gamified productivity app'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <AuthProvider>
        <body className={inter.className}>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </body>
      </AuthProvider>
    </html>
  )
}
