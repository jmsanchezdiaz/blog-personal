import { Input, Textarea, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

export const CustomInput = (props) => {
  const colorMode = useColorModeValue('gray.800', 'gray.300');
  return <Input borderColor={colorMode} {...props} />;
};

export const CustomTextarea = (props) => {
  const colorMode = useColorModeValue('gray.800', 'gray.300');
  return <Textarea borderColor={colorMode} {...props} />;
};
