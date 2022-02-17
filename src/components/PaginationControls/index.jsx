import React from 'react';
import { HStack, IconButton, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const PaginationControls = ({
  goPrevPage,
  goNextPage,
  amountOfPages,
  pageNumber,
  isPaginationNeeded,
}) => {
  if (!isPaginationNeeded) return null;
  return (
    <HStack w='full' justify='space-between'>
      <IconButton
        onClick={goPrevPage}
        colorScheme='purple'
        icon={<ChevronLeftIcon />}
      />
      <Text>
        {pageNumber} of {amountOfPages}
      </Text>
      <IconButton
        onClick={goNextPage}
        colorScheme='purple'
        icon={<ChevronRightIcon />}
      />
    </HStack>
  );
};

export default PaginationControls;
