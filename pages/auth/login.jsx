import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  FormErrorMessage,
  VStack,
  Icon,
  IconButton
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import Header from '../../src/components/Header';
import HiddenInput from '../../src/components/HiddenInput';
import { useAuth } from '../../src/hooks/useAuth';
import { loginSchema } from '../../src/helpers/validationSchema';
import { BsGoogle } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { CustomInput } from '../../src/components/CustomInput';
import { withPublic } from '../../src/components/hoc/withAuth';
import PublicComponent from '../../src/components/PublicComponent';
import SEO from '../../src/components/seo';

const Login = () => {
  const { signIn, signInWithGoogle } = useAuth();
  const router = useRouter();

  const redirectToRegisterPage = () => {
    router.push('/auth/register');
  };

  const handleSubmit = (values, { setSubmitting }) => {
    signIn(values);

    setSubmitting(false);
  };
  return (
    <PublicComponent>
      <SEO />
      <Header isLoginScreen />
      <Heading>Login</Heading>
      <Formik
        validationSchema={loginSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}>
        {({ touched, errors }) => (
          <Form autoComplete='off'>
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
            </VStack>

            <Button type='submit' colorScheme='purple'>
              Login
            </Button>
            <IconButton
              mx={3}
              type='button'
              colorScheme='orange'
              onClick={signInWithGoogle}
              icon={<Icon as={BsGoogle} />}
            />
            <Button
              type='button'
              onClick={redirectToRegisterPage}
              variant='ghost'
              colorScheme='purple'>
              Registrarse
            </Button>
          </Form>
        )}
      </Formik>
    </PublicComponent>
  );
};

export const getServerSideProps = withPublic(() => ({ props: {} }));

export default Login;
