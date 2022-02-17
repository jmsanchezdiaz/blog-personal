import { isAdminUser, parseCookie } from '../../helpers/helpers';

export const withPrivate = (gssp) => {
  return async (ctx) => {
    let cookies = parseCookie(ctx.req);
    if (!cookies?.user) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    }

    if (!isAdminUser(JSON.parse(cookies?.user))) {
      console.log(cookies);
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return await gssp(ctx);
  };
};

export const withPublic = (gssp) => {
  return async (ctx) => {
    let cookies = parseCookie(ctx.req);

    if (cookies.user) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return await gssp(ctx);
  };
};
