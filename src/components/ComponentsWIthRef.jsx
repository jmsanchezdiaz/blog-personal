import { Button, Heading, IconButton, Text } from '@chakra-ui/react';
import React from 'react';

export const ButtonRef = React.forwardRef(function ButtonRef(props, ref) {
  return <Button ref={ref} {...props} />;
});

export const IconButtonRef = React.forwardRef(function IconButtonRef(
  props,
  ref,
) {
  return <IconButton ref={ref} {...props} />;
});

export const HeadingRef = React.forwardRef(function IconButtonRef(props, ref) {
  return <Heading ref={ref} {...props} />;
});

export const TextRef = React.forwardRef(function IconButtonRef(props, ref) {
  return <Text ref={ref} {...props} />;
});
