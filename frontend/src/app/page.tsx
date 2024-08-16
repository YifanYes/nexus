'use client'

import { AuthContext } from '@/context/AuthContext'
import { LanguageContext } from '@/context/LanguageContext'
import { useContext } from 'react'

export default function Home() {
  const { logout } = useContext(AuthContext)
  const { t } = useContext(LanguageContext)

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <p>{t('home')}</p>
      <button
        type='submit'
        onClick={logout}
        className='mt-8 flex w-full justify-center rounded-md bg-[#5bc592] text-[#f7f8fa] px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-[#7bdcad] hover:text-white transition-colors duration-200 ease-in-out'
      >
        Logout
      </button>
    </main>
  )
}
