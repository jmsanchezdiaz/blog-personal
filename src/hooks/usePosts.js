import { useContext } from 'react';
import { PostContext } from '../context/PostProvider';

export const usePosts = () => useContext(PostContext);
