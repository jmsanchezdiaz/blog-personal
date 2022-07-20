import { Divider, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import Post from "../Post";

const PostsList = ({
  isSearchResult,
  ordered = true,
  posts = [],
  areEditable,
  ...rest
}) => {
  if (!isSearchResult && !posts.length)
    return <Heading size="md">No hay posts disponibles</Heading>;

  const postsOrdered = ordered
    ? [...posts].sort((a, b) => a.date < b.date)
    : posts;

  return (
    <VStack {...rest} w="full" divider={<Divider />} my={4} spacing={3}>
      {postsOrdered?.map((post) => {
        return <Post key={post.id} post={post} isEditable={areEditable} />;
      })}
    </VStack>
  );
};

export default PostsList;
