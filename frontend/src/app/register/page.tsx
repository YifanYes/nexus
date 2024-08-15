'use client'

import { AuthContext } from '@/context/AuthContext'
import { FormHelper } from '@/helpers'
import { FormikValues, useFormik } from 'formik'
import { useContext } from 'react'
import * as Yup from 'yup'

const Register = () => {
  const { register } = useContext(AuthContext)

  const validationSchema = Yup.object({
    name: Yup.string().required('Añade un nombre de usuario'),
    email: Yup.string().email('El email no es valido').required('Añade un nombre de usuario'),
    password: Yup.string()
      .min(7, 'La contraseña tiene que tener al menos 8 caracteres')
      .required('Añade una contraseña'),
    repeatPassword: Yup.string()
      .min(7, 'La contraseña tiene que tener al menos 8 caracteres')
      .required('Repite la contraseña')
  })

  const onSubmit = ({ name, email, password }: FormikValues) => register({ name, email, password })

  const { values, errors, touched, setFieldTouched, handleSubmit, setFieldValue } = useFormik({
    initialValues: { name: '', email: '', password: '', repeatPassword: '' },
    validationSchema,
    onSubmit
  })

  return (
    <div className='flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <h2 className='mb-8 text-center text-5xl text-balance font-light leading-9 tracking-tight text-gray-900'>
        Start your adventure
      </h2>
      <div className='space-y-6 mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <div>
          <label htmlFor='name' className='block text-sm font-medium leading-6 text-gray-900'>
            Username
          </label>
          <div className='mt-2 space-y-1'>
            <input
              id='name'
              name='name'
              type='text'
              autoComplete='name'
              value={values.name}
              onChange={(event: any) => {
                setFieldValue('name', event.target.value)
                setFieldTouched('name', true)
              }}
              required
              className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none'
            />
            {FormHelper.inputHasError('name', errors, touched) && <p className='text-red-600 text-xs'>{errors.name}</p>}
          </div>
        </div>

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
          <div className='flex items-center justify-between'>
            <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
              Repeat Password
            </label>
          </div>
          <div className='mt-2 space-y-1'>
            <input
              id='repeat-password'
              name='repeat-password'
              type='password'
              autoComplete='password'
              value={values.repeatPassword}
              onChange={(event: any) => {
                setFieldValue('repeatPassword', event.target.value)
                setFieldTouched('repeatPassword', true)
              }}
              required
              className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none'
            />
            {FormHelper.inputHasError('repeatPassword', errors, touched) && (
              <p className='text-red-600 text-xs'>{errors.repeatPassword}</p>
            )}
          </div>
        </div>

        <div>
          <button
            type='submit'
            onClick={() => handleSubmit()}
            className='mt-8 flex w-full justify-center rounded-md bg-[#5bc592] text-[#f7f8fa] px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-[#7bdcad] hover:text-white transition-colors duration-200 ease-in-out'
          >
            Join Nexus
          </button>
        </div>
        <p className='mt-10 text-center text-sm text-gray-500'>
          Already have an account?{' '}
          <a
            href='/login'
            className='font-semibold leading-6 text-[#5bc592] hover:text-[#7bdcad] transition-colors duration-200 ease-in-out'
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  )
}

export default Register
