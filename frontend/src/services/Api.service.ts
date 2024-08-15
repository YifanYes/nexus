import axios, { AxiosResponse } from 'axios'
import Config from './Config.service'
import Cookie from './Cookie.service'

type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

const DEFAULT_PREFIX = '/api'

export const instance = axios.create({
  baseURL: Config.apiEndpoint,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Localization': 'es',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

const call = async (method: ApiMethod, url: string, body?: any, withoutPrefix?: boolean): Promise<AxiosResponse> => {
  const token = Cookie.get(Config.token)
  return await instance({
    url: withoutPrefix ? url : DEFAULT_PREFIX + url,
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    withCredentials: true,
    withXSRFToken: true,
    ...(body && method !== 'GET' ? { data: body } : {})
  })
}

const get = async (url: string, withoutPrefix?: boolean): Promise<AxiosResponse> =>
  await call('GET', url, undefined, withoutPrefix)

const post = async (url: string, body?: any, withoutPrefix?: boolean): Promise<AxiosResponse> =>
  await call('POST', url, body, withoutPrefix)

const put = async (url: string, body?: any, withoutPrefix?: boolean): Promise<AxiosResponse> =>
  await call('PUT', url, body, withoutPrefix)

const deleteCall = async (url: string, body?: any, withoutPrefix?: boolean): Promise<AxiosResponse> =>
  await call('DELETE', url, body, withoutPrefix)

const Api = {
  get,
  post,
  put,
  delete: deleteCall
}

export default Api
