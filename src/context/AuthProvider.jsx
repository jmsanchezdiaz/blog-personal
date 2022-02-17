import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../../firebase.config';
import { errorToast, successToast } from '../helpers/toasts';

const provider = new GoogleAuthProvider();

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  const signIn = ({ email, password }) =>
    signInWithEmailAndPassword(auth, email, password)
      .then(() => successToast('Sesion iniciada con exito'))
      .catch((err) => errorToast(err.message));

  const signInWithGoogle = () =>
    signInWithPopup(auth, provider)
      .then((result) => {
        setAuthUser(result.user);
        successToast('Sesion iniciada con exito');
      })
      .catch((err) => errorToast(err.message));

  const register = ({ email, password }) =>
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => successToast('Sesion creada con exito'))
      .catch((err) => errorToast(err.message));

  const logOut = () =>
    signOut(auth)
      .then(() => {
        Cookies.remove('user', {
          sameSite: 'lax',
          secure: true,
        });
        successToast('Sesion cerrada con exito');
      })
      .catch((err) => errorToast(err.message));

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const formatUser = {
          uid: user.uid,
          email: user.email,
        };
        Cookies.set('user', JSON.stringify(formatUser), {
          sameSite: 'lax',
          secure: true,
        });
        setAuthUser(formatUser);
        return;
      }

      setAuthUser(null);
    });

    return () => {
      unsuscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ signInWithGoogle, authUser, logOut, register, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
