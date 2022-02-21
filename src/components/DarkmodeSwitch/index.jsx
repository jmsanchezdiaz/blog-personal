import { IconButton, useColorMode, Icon } from '@chakra-ui/react';
import React from 'react';
import { BsFillMoonFill, BsSunFill } from 'react-icons/bs';

const DarkmodeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      icon={<Icon as={colorMode === 'dark' ? BsSunFill : BsFillMoonFill} />}
    />
  );
};

export default DarkmodeSwitch;
