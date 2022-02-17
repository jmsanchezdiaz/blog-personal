import { ChakraProvider, Container } from '@chakra-ui/react';
import PostProvider from '../src/context/PostProvider';
import AuthProvider from '../src/context/AuthProvider';
import { ToastContainer } from 'react-toastify';
import theme from '../styles/theme';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <PostProvider>
        <ChakraProvider theme={theme}>
          <Container py={2} minH='100vh' maxW='container.md'>
            <ToastContainer />
            <Component {...pageProps} />
          </Container>
        </ChakraProvider>
      </PostProvider>
    </AuthProvider>
  );
}

export default MyApp;
