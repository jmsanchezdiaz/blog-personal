import { Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

const LogoutButton = () => {
  const { logOut } = useAuth();
  return (
    <Button
      onClick={logOut}
      colorScheme='red'
      d={['none', 'inline-block', 'inline-block', 'inline-block']}
      leftIcon={<Icon as={FiLogOut} />}>
      Log Out
    </Button>
  );
};

export default LogoutButton;
