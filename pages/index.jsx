import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';

import Image from 'next/image';
import Header from '../src/components/Header';
import { usePosts } from '../src/hooks/usePosts';
import { usePagination } from '../src/hooks/usePagination';
import PaginationControls from '../src/components/PaginationControls';
import PostsList from '../src/components/PostsList';
import SocialMediaLinks from '../src/components/SocialMediaLinks';
import SEO from '../src/components/seo/seo.jsx';

const ELEMENTS_PER_PAGE = 4;

export const Home = () => {
  const { posts } = usePosts();
  const pagination = usePagination(posts, ELEMENTS_PER_PAGE);
  const { filtered } = pagination;
  const colorMode = useColorModeValue('gray.900', 'white');

  return (
    <Container id='HOLAMUNDO' py={2} maxW='container.md'>
      <SEO />
      <Container maxW='container.sm'>
        <Header home />
        <Center flexDirection='column' gap={4}>
          <Box borderRadius='full' overflow='hidden'>
            <Image
              src='/images/profile.jpg'
              alt='profile-picture'
              objectFit='cover'
              objectPosition='top'
              width={200}
              height={200}
            />
          </Box>
          <Heading
            py={2}
            color='purple.500'
            borderBottomWidth={4}
            borderColor='purple.700'
            size='xl'>
            Bienvenido a mi blog personal!
          </Heading>
        </Center>
        <Text my={5}>
          Hola, soy un desarrollador Frontend Jr y estudiante de la Licenciatura
          en Informática de la <Link href='http://www.unq.edu.ar/'>UNQ</Link> ,
          Por el momento manejo las tecnologías JS, HTML, CSS, React, SASS,
          PostgreSQL. Espero que disfrutes mi perfil.
        </Text>

        <Flex
          flexDirection={['column-reverse', 'column-reverse', 'row', 'row']}
          gap={4}
          mt={4}
          alignItems={['center', 'center', 'flex-start', 'flex-start']}>
          <VStack flex={1} spacing={4} alignItems='flex-start'>
            <Heading color='purple.500' size='lg'>
              Mis Redes
            </Heading>
            <SocialMediaLinks color={colorMode} spacing={2} />
          </VStack>
          <Box flex={1} w={['full', 'full', 'auto', 'auto']}>
            <Heading mb={4} color='purple.500' size='lg'>
              Posts Recientes
            </Heading>
            <PostsList pb={2} alignItems='flex-start' posts={filtered} />
            <Divider d={['block', 'block', 'none', 'none']} />
            <PaginationControls {...pagination} />
          </Box>
        </Flex>
      </Container>
    </Container>
  );
};

export default Home;
