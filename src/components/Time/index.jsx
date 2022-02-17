import { Text } from '@chakra-ui/react';
import React from 'react';
import { capitalize, formatDate } from '../../helpers/helpers';

const Time = ({ ms, ...rest }) => {
  return <Text {...rest}>{capitalize(formatDate(ms))}</Text>;
};

export default Time;
