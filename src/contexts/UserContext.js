import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.init';

const auth = getAuth(app);
export const AuthContext = createContext();

const UserContext = ({children}) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);

    // 1. create user
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // 2. update name
    const updateName = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    // 3. email verify
    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser);
    }

    // 4. google signIn
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    // 5. logout
    const logOut = () => {
        return signOut(auth);
    }

    const authInfo = {
        user, 
        createUser,
        updateName,
        verifyEmail,
        signInWithGoogle,
        logOut
    };

    useEffect(() => {
        // eta run hobe jokhon component  mount hobe
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
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