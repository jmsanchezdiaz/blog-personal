import { EditIcon, Icon, SearchIcon } from '@chakra-ui/icons';
import { Button, HStack, Switch, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { isAdminUser } from '../../helpers/helpers';
import { useAuth } from '../../hooks/useAuth';
import { ButtonRef, IconButtonRef } from '../ComponentsWIthRef';
import { AiFillHome } from 'react-icons/ai';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/router';

const Header = ({ isLoginScreen }) => {
  const { toggleColorMode } = useColorMode();
  const { authUser, logOut } = useAuth();
  const router = useRouter();

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

        {!isLoginScreen && authUser ? (
          <Button
            onClick={logOut}
            colorScheme='red'
            d={['none', 'inline-block', 'inline-block', 'inline-block']}
            leftIcon={<Icon as={FiLogOut} />}>
            Log Out
          </Button>
        ) : (
          <Link passHref href='/auth/login'>
            <ButtonRef colorScheme='blue' leftIcon={<Icon as={FiLogIn} />}>
              Log In
            </ButtonRef>
          </Link>
        )}

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
