import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword,
    sendEmailVerification,
    updateProfile
} from "firebase/auth";

export const currentUser = auth.currentUser;

export const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const logout = () => {
    return signOut(auth);
}

export const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
}

export const changeEmail = (email) => {
    return updateEmail(auth.currentUser, email);
}

export const changePassword = (password) => {
    return updatePassword(auth.currentUser, password);
}

export const sendVerifyEmail = () => {
    return sendEmailVerification(auth.currentUser, {
        // TODO change to actual url
        url: 'http://localhost:3000/projects'
    });
}

export const updateName = (name) => {
    return updateProfile(auth.currentUser, { displayName: name })
}