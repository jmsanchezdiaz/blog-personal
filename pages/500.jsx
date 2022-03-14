import { Container, Heading, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { ButtonRef } from '../src/components/ComponentsWIthRef';
import SEO from '../src/components/seo';

const Error500 = () => {
  return (
    <Container py={2} minH='100vh' maxW='container.md'>
      <SEO />
      <VStack>
        <Heading size='2xl' as='h1'>
          500 Error
        </Heading>
        <Heading size='lg' as='h2'>
          A server error has occured. Sorry!
        </Heading>
        <Link passHref href='/'>
          <ButtonRef>Go back to Home</ButtonRef>
        </Link>
      </VStack>
    </Container>
  );
};

export default Error500;
