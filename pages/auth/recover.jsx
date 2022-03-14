import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { CustomInput } from '../../src/components/CustomInput/index.jsx';
import Header from '../../src/components/Header/index.jsx';
import PublicComponent from '../../src/components/PublicComponent/index.jsx';
import SEO from '../../src/components/seo/seo.jsx';
import { recoverSchema } from '../../src/helpers/validationSchema.js';
import { useAuth } from '../../src/hooks/useAuth.js';

const Recover = () => {
  const { recover } = useAuth();
  const handleSubmit = (values, actions) => {
    recover(values.email);
    actions.setIsSubmitting(false);
  };

  return (
    <PublicComponent>
      <SEO
        title='Pagina de Recuperacion'
        description='Pagina de recuperacion de contraseña'
      />
      <Header isLoginScreen />
      <Heading>Recuperación de contraseña</Heading>
      <Formik
        validationSchema={recoverSchema}
        initialValues={{ email: '' }}
        onSubmit={handleSubmit}>
        {({ touched, errors }) => {
          return (
            <Form>
              <FormControl
                my={4}
                isRequired
                isInvalid={touched.email && errors.email}>
                <FormLabel>Email:</FormLabel>
                <Field as={CustomInput} name='email' type='email' />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <Button type='submit' colorScheme='purple'>
                Enviar
              </Button>
            </Form>
          );
        }}
      </Formik>
    </PublicComponent>
  );
};

export default Recover;
