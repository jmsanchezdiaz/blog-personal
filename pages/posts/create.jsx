import { Heading } from '@chakra-ui/react';
import CreateForm from '../../src/components/CreateForm';
import Header from '../../src/components/Header';
import { withPrivate } from '../../src/components/hoc/withAuth';
import PrivateComponent from '../../src/components/PrivateComponent';
import { usePosts } from '../../src/hooks/usePosts';
import { useTags } from '../../src/hooks/useTags';

const Create = () => {
  const { createPost } = usePosts();
  const tagsObject = useTags();
  const { curTags, resetTags } = tagsObject;

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    let newPost = {
      ...values,
      tags: curTags,
      date: Date.now(),
      likes: 0,
      usersWhoLike: [],
    };
    createPost(newPost);
    resetForm();
    resetTags();
    setSubmitting(false);
  };

  return (
    <PrivateComponent>
      <Header />
      <Heading>Escribe un nuevo Post:</Heading>
      <CreateForm
        initValues={{ title: '', content: '', tags: '' }}
        onSubmit={handleSubmit}
        buttonText='Publicar'
        {...tagsObject}
      />
    </PrivateComponent>
  );
};

export const getServerSideProps = withPrivate(() => {
  return {
    props: {},
  };
});

export default Create;
