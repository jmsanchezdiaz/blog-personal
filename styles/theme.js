import { extendTheme, theme as base } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
const theme = {
  styles: {
    global: (props) => ({
      body: {
        bg: mode('gray.200', 'gray.900')(props),
      },
    }),
  },

  components: {
    Divider: {
      baseStyle: (props) => ({
        borderColor: mode('black.200', 'gray.200')(props),
      }),
    },
  },

  fonts: {
    heading: `Montserrat ${base.fonts.heading}`,
    body: `Arial ${base.fonts.body}`,
  },
};

export default extendTheme(theme);
