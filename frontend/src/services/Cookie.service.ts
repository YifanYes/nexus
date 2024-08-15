import cookie from 'js-cookie'

const getCookie = (name: string): any => cookie.get(name)

const setCookie = (name: string, value: any, options?: any): void => {
  cookie.set(name, value, {
    ...options,
    httpOnly: false
  })
}

const removeCookie = (name: string): void => cookie.remove(name)

const Cookie = {
  get: getCookie,
  set: setCookie,
  remove: removeCookie
}

export default Cookie
