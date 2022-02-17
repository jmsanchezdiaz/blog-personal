import Header from '../../src/components/Header';
import Time from '../../src/components/Time';
import { CalendarIcon, Icon } from '@chakra-ui/icons';
import {
  Container,
  Divider,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiFillTwitterCircle,
} from 'react-icons/ai';
import { getPostById, getPostsIds } from '../../src/dbcontrollers/controllers';
import { capitalize, parseArrayToString } from '../../src/helpers/helpers';
import { useState } from 'react';
import { useAuth } from '../../src/hooks/useAuth';
import { usePosts } from '../../src/hooks/usePosts';
import { infoToast } from '../../src/helpers/toasts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { useTwitterLink } from '../../src/hooks/useTwitterLink';

const PostScreen = ({ post }) => {
  const { authUser } = useAuth();
  const { updatePost } = usePosts();
  const [currentPost, setCurrentPost] = useState(post);
  console.log(currentPost, post);
  const { id, likes, usersWhoLike, content, title, tags, date } = currentPost;

  const twitterLink = useTwitterLink({
    title: title,
    hashtags: tags,
    fallbackURL: 'https://twitter.com',
  });

  const isLikedByCurrentUser = usersWhoLike.includes(authUser?.email);

  const dislike = () => {
    if (likes < 1) return;
    if (!authUser) {
      return infoToast('Debe estar logeado para dar interactuar');
    }
    let modifiedFields = {
      usersWhoLike: usersWhoLike.filter((user) => user.id !== authUser.id),
      likes: likes - 1,
    };
    updatePost(id, modifiedFields, false);
    setCurrentPost({ ...currentPost, ...modifiedFields });
  };

  const like = () => {
    if (!authUser) {
      return infoToast('Debe estar logeado para dar interactuar');
    }
    let modifiedFields = {
      usersWhoLike: usersWhoLike.concat(authUser.email),
      likes: likes + 1,
    };
    updatePost(id, modifiedFields, false);
    setCurrentPost({ ...currentPost, ...modifiedFields });
  };

  return (
    <Container py={2} maxW='container.md'>
      <Header />
      <VStack spacing={1} mb={3} alignItems='flex-start'>
        <Heading color='purple.500' mt={2} as='h2'>
          {capitalize(title)}
        </Heading>
        <Text fontStyle='italic' as='h4'>
          Escrito por{' '}
          <Text as='span' fontWeight='semibold'>
            Juan Manuel Sanchez Diaz
          </Text>
        </Text>
        <HStack>
          <CalendarIcon />
          <Time
            fontStyle='italic'
            fontSize='sm'
            aria-label='date of post creation'
            as='h6'
            ms={date}
          />
        </HStack>
      </VStack>
      <Divider />
      <ReactMarkdown
        components={ChakraUIRenderer()}
        remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
      <Divider />

      <HStack justify='space-between'>
        <Heading size='sm'>
          Tags:{' '}
          <Text as='span' fontWeight='light'>
            {parseArrayToString(tags)}
          </Text>
        </Heading>
        <HStack alignItems='center'>
          {isLikedByCurrentUser ? (
            <IconButton
              onClick={dislike}
              size='lg'
              colorScheme='red'
              variant='ghost'
              icon={<Icon as={AiFillHeart} />}
            />
          ) : (
            <IconButton
              onClick={like}
              size='lg'
              colorScheme='red'
              variant='ghost'
              icon={<Icon as={AiOutlineHeart} />}
            />
          )}

          <Text fontSize='xl'>{likes}</Text>
        </HStack>
      </HStack>
      <HStack>
        <a target='_blank' href={twitterLink} rel='noreferrer'>
          <IconButton
            as='span'
            icon={<Icon boxSize={8} as={AiFillTwitterCircle} />}
            colorScheme='blue'
          />
        </a>
      </HStack>
    </Container>
  );
};

export const getServerSideProps = withPrivate(async (ctx) => {
  const post = await getPostById(ctx.query.id);
  if (!post)
    return {
      notFound: true,
    };
  return {
    props: {
      post,
    },
  };
});
export default PostScreen;
