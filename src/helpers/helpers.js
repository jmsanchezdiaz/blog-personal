import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import cookie from 'cookie';

export const parseArrayToString = (arr = []) => arr?.join(', ');

export const capitalize = (string) => {
  if (typeof string !== 'string') throw new Error('The input is not a string');
  return string[0].toUpperCase() + string.slice(1);
};

export const isAdminUser = (user) =>
  user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export const formatDate = (ms) => {
  let date = new Date(ms);
  let formattedDate = format(date, 'LLLL y, d', {
    locale: {
      code: es.code,
      localize: es.localize,
      formatLong: es.formatLong
    }
  });

  return formattedDate;
};

export const parseCookie = (req) => {
  return cookie.parse(req ? req.headers.cookie || '' : '');
};

export const getUsernameFromEmail = (email) =>
  email ? email.slice(0, email.indexOf('@')) : 'Anonimo';
