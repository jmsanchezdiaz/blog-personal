import { Container, Heading, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { ButtonRef } from '../src/components/ComponentsWIthRef';
import SEO from '../src/components/seo';

const Error404 = () => {
  return (
    <Container py={2} minH='100vh' maxW='container.md'>
      <SEO />
      <VStack>
        <Heading size='2xl' as='h1'>
          404 Error
        </Heading>
        <Heading size='lg' as='h2'>
          The post you were looking for it doesn{"'"}t exist
        </Heading>
        <Link passHref href='/'>
          <ButtonRef>Go back to Home</ButtonRef>
        </Link>
      </VStack>
    </Container>
  );
};

export default Error404;
