import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { createSchema } from '../../helpers/validationSchema';
import { CustomInput, CustomTextarea } from '../CustomInput';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { useState } from 'react';

const CreateForm = ({
  initValues,
  onSubmit,
  buttonText,
  curTags = [],
  addTag,
  deleteTag,
}) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={createSchema}
      initialValues={initValues}>
      {({ values, errors, touched }) => (
        <Form>
          <VStack alignItems='flex-start'>
            <FormControl isInvalid={touched.title && errors.title}>
              <FormLabel>Titulo:</FormLabel>
              <Field as={CustomInput} type='text' name='title' />
              <FormErrorMessage>{errors.title}</FormErrorMessage>
            </FormControl>

            <Grid
              alignContent='space-between'
              columnGap={2}
              templateColumns='auto 1fr'>
              <GridItem w='full' colSpan={[2, 2, 1, 1]}>
                <FormControl isInvalid={touched.tags && errors.tags}>
                  <FormLabel>Temas:</FormLabel>
                  <HStack>
                    <Field as={CustomInput} type='text' name='tags' />
                    <Button
                      onClick={() => addTag(values.tags)}
                      type='button'
                      my={3}
                      colorScheme='blue'>
                      Añadir
                    </Button>
                  </HStack>
                  <FormErrorMessage>{errors.tags}</FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <VStack alignItems='flex-start'>
                  <Text>Temas añadidos</Text>
                  <Flex flexWrap='wrap' gap={1}>
                    {curTags?.length <= 0 ? (
                      <Text fontStyle='italic' opacity='0.75'>
                        No hay temas agregados.
                      </Text>
                    ) : (
                      curTags?.map((tag, i) => (
                        <Button
                          onClick={() => deleteTag(tag)}
                          size='xs'
                          borderRadius={4}
                          rightIcon={<CloseIcon />}
                          colorScheme='red'
                          type='button'
                          key={tag + i}>
                          {tag}
                        </Button>
                      ))
                    )}
                  </Flex>
                </VStack>
              </GridItem>
            </Grid>

            <FormControl isInvalid={touched.content && errors.content}>
              <Flex alignItems='center' justifyContent='space-between'>
                <FormLabel my={0}>
                  {showPreview ? 'Vista previa:' : 'Contenido:'}
                </FormLabel>
                <Button
                  onClick={() => setShowPreview((prvState) => !prvState)}
                  colorScheme='green'
                  variant='ghost'>
                  Preview
                </Button>
              </Flex>
              {showPreview ? (
                <Box
                  p={2}
                  borderWidth={1}
                  borderRadius={5}
                  borderColor='gray.600'
                  minH='xs'>
                  <ReactMarkdown
                    components={ChakraUIRenderer()}
                    remarkPlugins={[remarkGfm]}>
                    {values.content}
                  </ReactMarkdown>
                </Box>
              ) : (
                <Field as={CustomTextarea} minH='300px' name='content' />
              )}
              <FormErrorMessage>{errors.content}</FormErrorMessage>
            </FormControl>
            <Button type='submit' my={3} colorScheme='green'>
              {buttonText}
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default CreateForm;
