import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Spinner,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { CustomInput } from '../../src/components/CustomInput';
import Header from '../../src/components/Header';
import PaginationControls from '../../src/components/PaginationControls';
import PostsList from '../../src/components/PostsList';
import { searchSchema } from '../../src/helpers/validationSchema';
import { usePagination } from '../../src/hooks/usePagination';

const ELEMENTS_PER_PAGE = 4;
const initState = {
  results: [],
  msg: '',
};

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(initState);
  const pagination = usePagination(response.results, ELEMENTS_PER_PAGE);
  const { filtered } = pagination;

  const handleSubmit = ({ postQuery }, { setSubmitting }) => {
    setLoading(true);
    setResponse(initState);
    fetch('/api/posts/search?input=' + postQuery)
      .then((res) => res.json())
      .then((res) => {
        setResponse(res);
        setLoading(false);
      });
    setSubmitting(false);
  };

  return (
    <div>
      <Header />
      <Formik
        onSubmit={handleSubmit}
        validationSchema={searchSchema}
        initialValues={{ postQuery: '' }}>
        {({ errors, touched }) => (
          <Form>
            <FormControl isInvalid={touched.postQuery && errors.postQuery}>
              <Heading my={3} as={FormLabel} htmlFor='postQuery'>
                Busca posts:
              </Heading>
              <Flex gap={2} flexDirection={['column', 'column', 'row', 'row']}>
                <Field
                  as={CustomInput}
                  placeholder='Como crear un componente...'
                  name='postQuery'
                  type='text'
                />

                <Button colorScheme='blue' type='submit'>
                  Search
                </Button>
              </Flex>
              <FormErrorMessage>{errors.postQuery}</FormErrorMessage>
            </FormControl>
          </Form>
        )}
      </Formik>

      <Heading mt={4} size='md'>
        {response?.msg}
      </Heading>

      {loading && (
        <Center>
          <Spinner size='xl' />
        </Center>
      )}
      <PostsList minH='xs' alignItems='flex-start' posts={filtered} />

      <PaginationControls {...pagination} />
    </div>
  );
};

export default Search;
