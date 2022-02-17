import { Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import CreateForm from '../../../src/components/CreateForm';
import Header from '../../../src/components/Header';
import { withAuth } from '../../../src/components/hoc/withAuth';
import ProtectedComponent, {
  PrivateComponent,
} from '../../../src/components/ProtectedComponent';
import {
  getPostById,
  getPostsIds,
} from '../../../src/dbcontrollers/controllers';
import { usePosts } from '../../../src/hooks/usePosts';

const Update = ({ post }) => {
  const { updatePost } = usePosts();
  const tagsObject = useTags(post.tags || []);

  const handleSubmit = (values, { setSubmitting }) => {
    let updatedPost = { ...values, tags: curTags };
    updatePost(post.id, updatedPost);
    setSubmitting(false);
  };

  return (
    <PrivateComponent>
      <Header />
      <Heading>Actualiza un post:</Heading>
      <CreateForm
        initValues={{ title: post.title, content: post.content, tags: '' }}
        onSubmit={handleSubmit}
        buttonText='Actualizar'
        {...tagsObject}
      />
    </PrivateComponent>
  );
};

export const getStaticPaths = async () => {
  let paths = await getPostsIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = withAuth(async ({ params }) => {
  const post = await getPostById(params.id);
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

export default Update;
