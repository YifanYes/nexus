import { FormikErrors, FormikTouched } from 'formik'

const inputHasError = (field: string, errors: FormikErrors<any>, touched?: FormikTouched<any>): boolean => {
  if (!errors[field]) {
    return false
  }

  return (typeof errors[field] === 'string' && touched?.[field]) as boolean
}

const FormHelper = {
  inputHasError
}

export default FormHelper
