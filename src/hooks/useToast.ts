
import { toast, type ToastOptions } from 'react-toastify'

const successToast = (
  message: string, options?: ToastOptions) => {
    toast.success(message, options)
  }

const errorToast = (
  message: string, options?: ToastOptions) => {
    toast.error(message, options)
  }

const infoToast = (
  message: string, options?: ToastOptions) => {
    toast.info(message, options)
  }

const warningToast = (message: string, options?: ToastOptions) => {
  toast.warning(message, options)
}

export { successToast, errorToast, infoToast, warningToast }
