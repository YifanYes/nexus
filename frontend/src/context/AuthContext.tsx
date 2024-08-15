'use client'

import { User } from '@/models'
import { Api, Cookie, Notification } from '@/services'
import Config from '@/services/Config.service'
import { authAtom } from '@/state/atoms'
import { useAtom } from 'jotai'
import React, { useCallback, useEffect } from 'react'

type AuthContextType = {
  isLogged: boolean
  isLoading: boolean
  user?: User
  register: (data: { name: string; email: string; password: string }) => void
  login: (data: { email: string; password: string }) => void
  logout: () => void
}

const initialAuthContext: AuthContextType = {
  isLogged: false,
  isLoading: true,
  user: undefined,
  login: () => {},
  register: () => {},
  logout: () => {}
}

export const AuthContext = React.createContext(initialAuthContext)

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useAtom(authAtom)

  const isAuthPage = useCallback((pathname: string) => ['/login', '/register'].includes(pathname), [])

  const autoLogin = useCallback(async () => {
    try {
      if (!Cookie.get(Config.token)) {
        return
      }

      const res = await Api.get(`/user`)
      setUser(new User().fromApi(res.data.data))

      if (isAuthPage(window.location.pathname)) {
        window.location.replace('/')
        return
      }
    } catch (error) {
      Notification.error('An error occurred while getting the user data, please try again later')
    }
  }, [setUser, isAuthPage])

  const setupContext = useCallback(async () => {
    if (user) {
      return
    }

    await autoLogin()
  }, [user, autoLogin])

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const res = await Api.post(`/login`, { email, password })
      Cookie.set(Config.token, res.data.data.access_token, {
        expires: 7 // seconds to days
      })
      Notification.success('Welcome!')
      await autoLogin()
    } catch (error) {
      Notification.error('An error occurred while login, please try again later')
    }
  }

  const register = async ({ name, password, email }: { name: string; password: string; email: string }) => {
    try {
      const res = await Api.post(`/register`, { name, password, email })
      Cookie.set(Config.token, res.data.data.access_token, {
        expires: 7 // seconds to days
      })
      Notification.success('Welcome!')
      await autoLogin()
    } catch (error) {
      Notification.error('An error occurred while registering, please try again later')
    }
  }

  const logout = async () => {
    try {
      await Api.post(`/logout`)
      Cookie.remove(Config.token)
      setUser(undefined)
      Notification.success('Good Bye!')
      window.location.assign('/login')
    } catch (error: any) {
      Notification.error('An error occurred while login out, please try again later')
    }
  }

  const getApiKey = useCallback(() => Api.get('/sanctum/csrf-cookie', true), [])

  useEffect(() => {
    if (!Cookie.get(Config.xsrfToken)) {
      getApiKey()
    }
    setupContext()
  }, [setupContext, getApiKey])

  return (
    <AuthContext.Provider
      value={{
        isLogged: typeof user !== 'undefined',
        isLoading: typeof user === 'undefined',
        user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
