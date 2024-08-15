'use client'

import { AuthContext } from '@/context/AuthContext'
import { FormHelper } from '@/helpers'
import { FormikValues, useFormik } from 'formik'
import { useContext } from 'react'
import * as Yup from 'yup'

const Login = () => {
  const { login } = useContext(AuthContext)

  const validationSchema = Yup.object({
    email: Yup.string().required('Añade un nombre de usuario'),
    password: Yup.string().required('Añade una contraseña')
  })

  const onSubmit = ({ email, password }: FormikValues) => login({ email, password })

  const { values, errors, touched, setFieldTouched, handleSubmit, setFieldValue } = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit
  })

  return (
    <div className='flex flex-row w-full'>
      <div className='flex h-screen flex-1 flex-col justify-center basis-1/2 px-6 py-12 lg:px-8'>
        <h2 className='mb-16 text-center text-5xl text-balance font-light leading-9 tracking-tight text-gray-900'>
          Log in your adventure
        </h2>
        <div className='space-y-4 sm:mx-auto sm:w-full sm:max-w-sm'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
              Email
            </label>
            <div className='mt-2 space-y-1'>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                value={values.email}
                onChange={(event: any) => {
                  setFieldValue('email', event.target.value)
                  setFieldTouched('email', true)
                }}
                required
                className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none'
              />
              {FormHelper.inputHasError('email', errors, touched) && (
                <p className='text-red-600 text-xs'>{errors.email}</p>
              )}
            </div>
          </div>
          <div>
            <div className='flex items-center justify-between'>
              <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                Password
              </label>
              {false && (
                <div className='text-sm'>
                  <a
                    href='/change-password'
                    className='font-semibold text-[#5bc592] hover:text-[#7bdcad] transition-colors duration-200 ease-in-out'
                  >
                    Forgot your password?
                  </a>
                </div>
              )}
            </div>
            <div className='mt-2 space-y-1'>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='password'
                value={values.password}
                onChange={(event: any) => {
                  setFieldValue('password', event.target.value)
                  setFieldTouched('password', true)
                }}
                required
                className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none'
              />
              {FormHelper.inputHasError('password', errors, touched) && (
                <p className='text-red-600 text-xs'>{errors.password}</p>
              )}
            </div>
          </div>
          <div>
            <button
              type='submit'
              onClick={() => handleSubmit()}
              className='mt-8 mb-6 flex w-full justify-center rounded-md bg-[#5bc592] text-[#f7f8fa] px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-[#7bdcad] hover:text-white transition-colors duration-200 ease-in-out'
            >
              Log In
            </button>
          </div>
          <div className='text-center text-sm text-gray-500'>
            Don´t have an account yet?{' '}
            <a
              href='/register'
              className='font-semibold leading-6 text-[#5bc592] hover:text-[#7bdcad] transition-colors duration-200 ease-in-out'
            >
              Make yours here
            </a>
          </div>
        </div>
      </div>
      <div className='basis-1/2 bg-gray-300'></div>
    </div>
  )
}

export default Login
