import { CalendarIcon, Icon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { parseArrayToString } from '../../helpers/helpers';
import { usePosts } from '../../hooks/usePosts';
import { ButtonRef, HeadingRef } from '../ComponentsWIthRef';
import Time from '../Time';

const Post = ({ post, isEditable = false }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { deletePost } = usePosts();

  const handleDelete = () => {
    deletePost(post.id);
    onClose();
  };

  return (
    <>
      <AlertDialog isCentered isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Borrar Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Estas seguro que quieres eliminar este post?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cerrar</Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Borrar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Flex
        flexDirection={['column', 'row', 'row', 'row']}
        alignItems='center'
        justifyContent='space-between'
        w='full'>
        <VStack w='full' alignItems='flex-start'>
          <Link passHref href={`/posts/${post.id}`}>
            <HeadingRef cursor='pointer' as='span' size='sm'>
              {post.title}
            </HeadingRef>
          </Link>
          <Text color='purple.500'>{parseArrayToString(post.tags)}</Text>
          <Flex
            my={2}
            gap={2}
            justifyContent='space-between'
            alignItems='center'>
            <Flex gap={2} alignItems='center'>
              <CalendarIcon />
              <Time fontSize='sm' as='span' ms={post.date} />
            </Flex>
            <Flex gap={2} alignItems='center'>
              <Icon as={AiFillHeart} />
              <Text>{post.likes}</Text>
            </Flex>
          </Flex>
        </VStack>
        {isEditable && (
          <Flex>
            <Link passHref href={`/posts/update/${post.id}`}>
              <ButtonRef variant='ghost' colorScheme='green'>
                Editar
              </ButtonRef>
            </Link>
            <Button onClick={onOpen} variant='ghost' colorScheme='red'>
              Borrar
            </Button>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default Post;
