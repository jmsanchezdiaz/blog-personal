import { toast } from 'react-toastify';

export const errorToast = (message) =>
  toast(message, {
    position: 'top-center',
    theme: 'dark',
    type: 'error',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });

export const infoToast = (message) =>
  toast(message, {
    position: 'top-center',
    theme: 'dark',
    type: 'info',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });

export const successToast = (message) =>
  toast(message, {
    position: 'top-center',
    theme: 'dark',
    type: 'success',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });
