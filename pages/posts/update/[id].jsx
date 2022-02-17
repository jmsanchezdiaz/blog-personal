import { Heading } from '@chakra-ui/react';
import CreateForm from '../../../src/components/CreateForm';
import Header from '../../../src/components/Header';
import { withPrivate } from '../../../src/components/hoc/withAuth';
import PrivateComponent from '../../../src/components/PrivateComponent';
import { getPostById } from '../../../src/dbcontrollers/controllers';
import { usePosts } from '../../../src/hooks/usePosts';
import { useTags } from '../../../src/hooks/useTags';

const Update = ({ post }) => {
  const { updatePost } = usePosts();
  const tagsObject = useTags(post.tags || []);

  const handleSubmit = (values, { setSubmitting }) => {
    let updatedPost = { ...values, tags: tagsObject.curTags };
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

export default Update;
