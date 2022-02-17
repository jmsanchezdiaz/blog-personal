import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

const PrivateComponent = ({ children }) => {
  const router = useRouter();
  const { authUser } = useAuth();

  useEffect(() => {
    let user = Cookies.get('user') && JSON.parse(Cookies.get('user'));
    if (!user && !authUser) {
      router.replace('/auth/login');
    }
  }, [router, authUser]);

  return <div>{children}</div>;
};

export default PrivateComponent;
