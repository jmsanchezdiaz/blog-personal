import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore/lite';
import { db, postsCollection } from '../../firebase.config';

//@return Post[] : object[]
export const getPosts = async () => {
  try {
    let { docs } = await getDocs(postsCollection);
    if (!docs.length) return docs;

    let posts = docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return posts;
  } catch (err) {
    throw new Error(err);
  }
};
//@return Post : object
export const addPost = async (newPost) => {
  try {
    let addedPost = await addDoc(postsCollection, newPost);
    return { id: addedPost.id, ...newPost };
  } catch (err) {
    throw new Error(err);
  }
};

// @return id : string
export const getPostsIds = async () => {
  try {
    let { docs } = await getDocs(postsCollection);
    if (!docs.length) return docs;

    return docs.map((doc) => {
      return {
        params: {
          id: doc.id,
        },
      };
    });
  } catch (err) {
    throw new Error(err);
  }
};

//@return Post : object
export const getPostById = async (id) => {
  try {
    let postRef = doc(db, 'posts', id);
    let post = await getDoc(postRef);
    return {
      id: post.id,
      ...post.data(),
    };
  } catch (err) {
    throw new Error(err);
  }
};
//@return Post : object
export const deletePostById = async (id) => {
  try {
    let postRef = doc(db, 'posts', id);
    return await deleteDoc(postRef);
  } catch (err) {
    throw new Error(err);
  }
};
//@return Post : object
export const updatePostsById = async (id, updatedFields) => {
  try {
    let postRef = doc(db, 'posts', id);
    return await updateDoc(postRef, updatedFields);
  } catch (err) {
    throw new Error(err);
  }
};
