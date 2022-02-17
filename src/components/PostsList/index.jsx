import { Divider, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import Post from '../Post';

const PostsList = ({ posts, areEditable, ...rest }) => {
  if (!posts || !posts.length)
    return <Heading size='md'>No hay posts disponibles</Heading>;

  return (
    <VStack {...rest} w='full' divider={<Divider />} my={4} spacing={3}>
      {posts?.map((post) => {
        return <Post key={post.id} post={post} isEditable={areEditable} />;
      })}
    </VStack>
  );
};

export default PostsList;
