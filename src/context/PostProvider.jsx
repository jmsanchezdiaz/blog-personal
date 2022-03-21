import { createContext, useEffect, useState } from 'react';
import {
  addPost,
  deletePostById,
  getPosts,
  updatePostsById
} from '../dbcontrollers/controllers';
import { errorToast, successToast } from '../helpers/toasts';

export const PostContext = createContext();

export default function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let ab = new AbortController();
    if (!posts.length)
      getPosts()
        .then((fetchPosts) => {
          if (fetchPosts) {
            setPosts(fetchPosts);
          }
        })
        .catch((err) => errorToast('No hay posts disponibles'));

    return () => {
      ab.abort();
    };
  }, [posts]);

  const createPost = (newPost) => {
    addPost(newPost)
      .then((post) => {
        successToast('Post creado correctamente');
        setPosts((prevState) => prevState.concat(post));
      })
      .catch((err) => errorToast(err.message));
  };

  const updatePost = (id, updatedFields, notify = true) => {
    updatePostsById(id, updatedFields)
      .then(() => {
        if (notify) successToast('Post actualizado correctamente');
        setPosts((prevState) =>
          prevState.map((post) =>
            post.id === id ? { ...post, ...updatedFields } : post
          )
        );
      })
      .catch((err) => errorToast(err.message));
  };

  const deletePost = (id) => {
    deletePostById(id)
      .then(() => {
        successToast('Post borrado correctamente');
        setPosts((prevState) => prevState.filter((post) => post.id !== id));
      })
      .catch((err) => errorToast(err.message));
  };

  return (
    <PostContext.Provider value={{ posts, createPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
}
