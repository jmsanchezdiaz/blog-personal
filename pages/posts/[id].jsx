import Header from "../../src/components/Header";import Time from "../../src/components/Time";
import { CalendarIcon, Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Heading,
  IconButton,
  Stack,
  Text,
  Textarea,
  useColorModeValue
} from "@chakra-ui/react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiFillTwitterCircle,
  AiOutlineComment,
  AiFillEdit,
  AiFillDelete
} from "react-icons/ai";
import { getPostById } from "../../src/dbcontrollers/controllers";
import {
  capitalize,
  getUsernameFromEmail,
  parseArrayToString,
  formatDate
} from "../../src/helpers/helpers";
import { useState } from "react";
import { useAuth } from "../../src/hooks/useAuth";
import { usePosts } from "../../src/hooks/usePosts";
import { errorToast, infoToast } from "../../src/helpers/toasts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { useTwitterLink } from "../../src/hooks/useTwitterLink";
import SEO from "../../src/components/seo/seo.jsx";

const PostScreen = ({ post }) => {
  const { authUser } = useAuth();
  const { updatePost } = usePosts();
  const [currentPost, setCurrentPost] = useState(post);
  const [commId, setCommId] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const { id, likes, usersWhoLike, content, title, tags, date, comments } =
    currentPost;
  const username = getUsernameFromEmail(authUser?.email);
  const colorMode = useColorModeValue("white", "gray.700");
  const [commentContent, setCommentContent] = useState("");

  const addComment = () => {
    if (!commentContent)
      return errorToast("No se puede publicar un comentario vacio!");
    const newComment = {
      id: comments.length + 1,
      content: commentContent,
      createdAt: Date.now(),
      userEmail: authUser?.email
    };
    const mappedComments = [...comments, newComment];
    updatePost(id, { comments: mappedComments }, false);
    setCurrentPost((prv) => ({
      ...prv,
      comments: mappedComments
    }));
    setCommentContent("");
  };

  const updateComment = () => {
    if (!commentContent)
      return errorToast("No se puede actualizar un comentario vacio!");

    const mappedComments = comments.map((comm) =>
      comm.id === commId ? { ...comm, content: commentContent } : comm
    );
    updatePost(id, { comments: mappedComments }, false);
    setCurrentPost((prv) => ({
      ...prv,
      comments: mappedComments
    }));
    setCommentContent("");
  };

  const deleteComment = (_id) => {
    let filteredComments = comments.filter(({ id }) => id !== _id);
    updatePost(id, { comments: filteredComments }, false);
    setCurrentPost((prv) => ({
      ...prv,
      comments: filteredComments
    }));
  };

  const selectComment = (comment) => {
    setCommentContent(comment.content);
    setCommId(comment.id);
  };

  const twitterLink = useTwitterLink({
    title: title,
    hashtags: tags,
    fallbackURL: "https://twitter.com"
  });

  const isLikedByCurrentUser = usersWhoLike?.includes(authUser?.email);

  const dislike = () => {
    if (likes < 1) return;
    if (!authUser) {
      return infoToast("Debe estar logeado para dar interactuar");
    }

    const usersWhoLikedThePost = usersWhoLike.filter(
      (userEmail) => userEmail !== authUser.email
    );

    let modifiedFields = {
      usersWhoLike: usersWhoLikedThePost,
      likes: usersWhoLikedThePost.length
    };
    updatePost(id, modifiedFields, false);
    setCurrentPost({ ...currentPost, ...modifiedFields });
  };

  const like = () => {
    if (!authUser) {
      return infoToast("Debe estar logeado para dar interactuar");
    }
    const usersWhoLikedThePost = usersWhoLike.concat(authUser.email);

    let modifiedFields = {
      usersWhoLike: usersWhoLikedThePost,
      likes: usersWhoLikedThePost.length
    };
    updatePost(id, modifiedFields, false);
    setCurrentPost({ ...currentPost, ...modifiedFields });
  };

  return (
    <Container py={2} maxW="container.md">
      <SEO
        title={post.title}
        description={
          "Post que trata sobre los siguentes temas: " + post.tags.join(", ")
        }
      />
      <Header />
      <Stack spacing={1} mb={3} alignItems="flex-start">
        <Heading color="purple.500" mt={2} as="h2">
          {capitalize(title)}
        </Heading>
        <Text fontStyle="italic" as="h4">
          Escrito por{" "}
          <Text as="span" fontWeight="semibold">
            Juan Manuel Sanchez Diaz
          </Text>
        </Text>
        <Stack direction="row">
          <CalendarIcon />
          <Time
            fontStyle="italic"
            fontSize="sm"
            aria-label="date of post creation"
            as="h6"
            ms={date}
          />
        </Stack>
      </Stack>
      <Divider />
      <ReactMarkdown
        components={ChakraUIRenderer()}
        remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
      <Divider />

      <Stack my={4} direction="row" justify="space-between">
        <Heading size="sm">
          Tags:{" "}
          <Text as="span" fontWeight="light">
            {parseArrayToString(tags)}
          </Text>
        </Heading>
        <Stack direction="row" alignItems="center">
          {isLikedByCurrentUser ? (
            <IconButton
              onClick={dislike}
              size="lg"
              colorScheme="red"
              variant="ghost"
              icon={<Icon as={AiFillHeart} />}
            />
          ) : (
            <IconButton
              onClick={like}
              size="lg"
              colorScheme="red"
              variant="ghost"
              icon={<Icon as={AiOutlineHeart} />}
            />
          )}

          <Text fontSize="xl">{likes}</Text>
        </Stack>
      </Stack>
      <Stack direction="row" py={4} justify="space-between">
        <a target="_blank" href={twitterLink} rel="noreferrer">
          <IconButton
            as="span"
            icon={<Icon boxSize={8} as={AiFillTwitterCircle} />}
            colorScheme="blue"
          />
        </a>
        <Stack direction="row" gap={1} justify="space-between" align="center">
          <Text fontWeight={600} fontSize="xl">
            {comments.length}
          </Text>
          <IconButton
            onClick={() => setShowComments(!showComments)}
            aria-label="toggle visibility of comments"
            icon={<Icon boxSize={8} as={AiOutlineComment} />}
          />
        </Stack>
      </Stack>
      <Divider />
      {showComments && (
        <Stack align="center">
          {authUser && (
            <Stack
              borderRadius="lg"
              bg={colorMode}
              p={4}
              direction={["column", "row", "row", "row"]}
              align={["center", "center", "center", "flex-start"]}
              justify="space-between"
              w="full"
              m={2}>
              <Stack flex={1} direction="row" spacing={4} alignItems="center">
                <Avatar size="md" name={username} />
                <Textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  resize="none"
                  placeholder="Escribe un comentario..."
                />
              </Stack>
              <Stack
                align="stretch"
                justify="center"
                direction={["row", "column", "column", "column"]}>
                <Button onClick={addComment} colorScheme="green">
                  Publicar
                </Button>
                  <Button onClick={updateComment} colorScheme="blue">
                    Actualizar
                  </Button>
              </Stack>
            </Stack>
          )}
          {comments.map((comment) => {
            const commentUsername = getUsernameFromEmail(comment.userEmail);
            const createdAt = capitalize(formatDate(comment.createdAt));
            return (
              <Stack
                direction="row"
                p={4}
                m={2}
                w="full"
                bg="white"
                borderRadius="lg"
                justify="flex-start"
                alignItems="flex-start"
                key={comment.id}>
                <Avatar size="md" name={commentUsername} />
                <Stack
                  divider={<Divider />}
                  w="full"
                  color="gray.700"
                  alignItems="flex-start">
                  <Stack
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    w="full">
                    <Stack>
                      <Heading fontSize="md">{commentUsername}</Heading>{" "}
                      <Text as="span" opacity={0.7}>
                        {createdAt}
                      </Text>
                    </Stack>
                    {authUser && (
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <IconButton
                          colorScheme="blue"
                          variant="outline"
                          onClick={() => selectComment(comment)}
                          icon={<Icon boxSize="15px" as={AiFillEdit} />}
                        />
                        <IconButton
                          colorScheme="red"
                          variant="outline"
                          onClick={() => deleteComment(comment.id)}
                          icon={<Icon boxSize="15px" as={AiFillDelete} />}
                        />
                      </Stack>
                    )}
                  </Stack>

                  <Text>{comment.content}</Text>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      )}
    </Container>
  );
};

export const getServerSideProps = async (ctx) => {
  const post = await getPostById(ctx.query.id);
  if (!post)
    return {
      notFound: true
    };
  return {
    props: {
      post
    }
  };
};
export default PostScreen;
