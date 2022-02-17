import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { parseCookie } from '../../helpers/helpers';
import { useAuth } from '../../hooks/useAuth';

export const PrivateComponent = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookie();
    if (!cookies.user) {
      router.replace('/auth/login');
    }
  }, [router]);

  return <div>{children}</div>;
};

export const PublicComponent = ({ children }) => {
  const router = useRouter();
  const { authUser } = useAuth();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (authUser) {
      router.replace('/');
    }
  }, [authUser, router]);

  return <div>{children}</div>;
};
