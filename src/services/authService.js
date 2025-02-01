import { auth } from '../config/firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Inscription
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = async () => {
  try {
    // Get the user's ID token
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);

    // Sign in with the credential from the Google user
    return signInWithCredential(auth, googleCredential);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Connexion
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Déconnexion
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
