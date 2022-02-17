import { EditIcon, Icon, SearchIcon } from '@chakra-ui/icons';
import { HStack, Switch, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { isAdminUser } from '../../helpers/helpers';
import { useAuth } from '../../hooks/useAuth';
import { IconButtonRef } from '../ComponentsWIthRef';
import { AiFillHome } from 'react-icons/ai';
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';

const Header = ({ isLoginScreen }) => {
  const { toggleColorMode } = useColorMode();
  const { authUser } = useAuth();

  return (
    <HStack mb={6} mt={2} w='full' alignItems='center' justify='space-between'>
      <Link passHref href='/'>
        <IconButtonRef
          as='a'
          colorScheme='purple'
          icon={<Icon as={AiFillHome} />}
          aria-label='go to homepage'
        />
      </Link>

      <HStack justify='center'>
        {isAdminUser(authUser) && (
          <Link passHref href='/posts/dashboard'>
            <IconButtonRef
              colorScheme='green'
              icon={<EditIcon />}
              aria-label='go to dashboard'
            />
          </Link>
        )}

        {!isLoginScreen && (authUser ? <LogoutButton /> : <LoginButton />)}

        <Link passHref href='/posts/search'>
          <IconButtonRef
            aria-label='go to search screen'
            colorScheme='green'
            icon={<SearchIcon />}
          />
        </Link>
      </HStack>

      <Switch id='darkmode-switch' onChange={toggleColorMode} />
    </HStack>
  );
};

export default Header;
