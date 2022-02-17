import { AddIcon } from '@chakra-ui/icons';
import { Divider, Flex, Heading, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { ButtonRef } from '../../src/components/ComponentsWIthRef';
import Header from '../../src/components/Header';
import PaginationControls from '../../src/components/PaginationControls';
import PostsList from '../../src/components/PostsList';
import { usePagination } from '../../src/hooks/usePagination';
import { usePosts } from '../../src/hooks/usePosts';
import { withAuth } from '../../src/components/hoc/withAuth';
import { PrivateComponent } from '../../src/components/ProtectedComponent';

const ELEMENTS_PER_PAGE = 4;

const Dashboard = () => {
  const { posts } = usePosts();
  const pagination = usePagination(posts, ELEMENTS_PER_PAGE);
  const { filtered } = pagination;

  return (
    <PrivateComponent>
      <Header />
      <VStack alignItems='flex-start' spacing={4}>
        <Flex
          flexDirection={['column', 'row', 'row', 'row']}
          w='full'
          mt={4}
          gap={4}
          justify='space-between'
          alignItems={['flex-start', 'center', 'center', 'center']}>
          <Heading>DASHBOARD</Heading>

          <Link passHref href='/posts/create'>
            <ButtonRef colorScheme='blue' leftIcon={<AddIcon />}>
              Crear un post
            </ButtonRef>
          </Link>
        </Flex>
        <Heading as='h2' fontWeight='light' size='lg'>
          Posts creados:
        </Heading>
        <Divider />
        <PostsList
          minH='sm'
          alignItems='space-between'
          posts={filtered}
          areEditable
        />
        <PaginationControls {...pagination} />
      </VStack>
    </PrivateComponent>
  );
};

export const getServerSideProps = withAuth(() => {
  return {
    props: {},
  };
});

export default Dashboard;
