import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.init';

const auth = getAuth(app);
export const AuthContext = createContext();

const UserContext = ({children}) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // 2. update name
    const updateName = (name) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    // 3. email verify
    const verifyEmail = () => {
        setLoading(true);
        return sendEmailVerification(auth.currentUser);
    }

    // 4. google signIn
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // 5. logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // 6. login with password
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // 7. forget password
    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }

    const authInfo = {
        user, 
        createUser,
        updateName,
        verifyEmail,
        signInWithGoogle,
        logOut,
        signIn,
        resetPassword,
        loading
    };

    useEffect(() => {
        // eta run hobe jokhon component  mount hobe
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
          // eta run hobe johkon component unmount hobe
          unsubscribe();
        }
      },[])

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;