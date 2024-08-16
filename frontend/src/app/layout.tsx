import AuthProvider from '@/context/AuthContext'
import { LanguageProvider } from '@/context/LanguageContext'
import '@/styles/globals.css'
import { Metadata } from 'next'
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
  return (
    <html>
      <LanguageProvider>
        <AuthProvider>
          <body className={inter.className}>{children}</body>
        </AuthProvider>
      </LanguageProvider>
    </html>
  )
}
