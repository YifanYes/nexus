import toast, { Renderable, ValueOrFunction } from 'react-hot-toast'
import Config from './Config.service'

const session = {
  set: (data: NotificationContent) => {
    localStorage.setItem(Config.notification, JSON.stringify(data))
  },
  get: () => {
    const value = localStorage.getItem(Config.notification)
    if (value) {
      return JSON.parse(value)
    }

    return value
  },
  clear: () => {
    localStorage.removeItem(Config.notification)
  }
}

const notify = (message: string) => toast(message)

const success = (message: string) => toast.success(message)

const error = (message: string) => toast.error(message)

const loading = (message: string) => toast.loading(message)

const promise = (
  promise: Promise<unknown>,
  options: {
    loading: Renderable
    success: ValueOrFunction<Renderable, any>
    error: ValueOrFunction<Renderable, any>
  }
) => toast.promise(promise, options)

const Notification = {
  notify,
  success,
  error,
  loading,
  promise,
  session
}

export default Notification
