import { Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { FiLogIn } from 'react-icons/fi';
import { ButtonRef } from '../ComponentsWIthRef';

const LoginButton = () => {
  return (
    <Link passHref href='/auth/login'>
      <ButtonRef colorScheme='blue' leftIcon={<Icon as={FiLogIn} />}>
        Log In
      </ButtonRef>
    </Link>
  );
};

export default LoginButton;
