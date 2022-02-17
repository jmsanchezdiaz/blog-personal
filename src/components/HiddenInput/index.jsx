import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { IconButton, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useState } from 'react';
import { CustomInput } from '../CustomInput';

const HiddenInput = ({ type, ...props }) => {
  const [showInput, setShowInput] = useState(false);
  const toggleInputView = () => setShowInput((prev) => !prev);
  return (
    <InputGroup>
      <CustomInput type={showInput ? 'text' : type} {...props} />
      <InputRightElement>
        <IconButton
          bg='none'
          aria-label='toggle visibility of input'
          _hover={{ bg: 'none' }}
          onClick={toggleInputView}
          icon={showInput ? <ViewOffIcon /> : <ViewIcon />}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default HiddenInput;
