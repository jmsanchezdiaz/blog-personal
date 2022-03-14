import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  FormErrorMessage,
  VStack
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import Header from '../../src/components/Header';
import HiddenInput from '../../src/components/HiddenInput';
import { useAuth } from '../../src/hooks/useAuth';
import { registerSchema } from '../../src/helpers/validationSchema';
import { toast } from 'react-toastify';
import { CustomInput } from '../../src/components/CustomInput';
import { withPublic } from '../../src/components/hoc/withAuth';
import PublicComponent from '../../src/components/PublicComponent';
import SEO from '../../src/components/seo/seo.jsx';

const Register = () => {
  const { register } = useAuth();

  const handleSubmit = (values, { setSubmitting }) => {
    register(values);
    setSubmitting(false);
  };

  return (
    <PublicComponent>
      <SEO
        title='Pagina de Registro'
        description='Pagina de registro a mi blog'
      />
      <Header isLoginScreen />
      <Heading>Register to my blog</Heading>
      <Formik
        validationSchema={registerSchema}
        initialValues={{ email: '', confirmPassword: '', password: '' }}
        onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            <VStack spacing={4} my={4} alignItems='flex-start'>
              <FormControl isRequired isInvalid={touched.email && errors.email}>
                <FormLabel>Email:</FormLabel>
                <Field as={CustomInput} name='email' type='email' />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={touched.password && errors.password}>
                <FormLabel>Password:</FormLabel>
                <Field as={HiddenInput} name='password' type='password' />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={touched.confirmPassword && errors.confirmPassword}>
                <FormLabel>Confirm Password:</FormLabel>
                <Field
                  as={HiddenInput}
                  name='confirmPassword'
                  type='password'
                />
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>
            </VStack>

            <Button type='submit' colorScheme='purple'>
              Registrarse
            </Button>
          </Form>
        )}
      </Formik>
    </PublicComponent>
  );
};

export const getServerSideProps = withPublic(() => ({ props: {} }));

export default Register;
