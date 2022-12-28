import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import app from '../../Firebase/Firebase.config';



export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    
    const providerGoogle = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);

    const createUser = (email, password) => {
        // setLoading(true);
        setLoading1(true);
        return createUserWithEmailAndPassword(auth, email, password); 
    }

    const userLogin = (email, password) => {
        // setLoading(true);
        setLoading1(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, providerGoogle);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log("Current User From Auth Provider", currentUser);
            setUser(currentUser);
            setLoading(false)
            setLoading1(false)
        })
        return () => unsubscribe();
    }, []);




    //Theme Toggle Code Starts
    const [theme, setTheme] = useState("Light");

    useEffect( () => {
        if(theme === "dark"){
            document.documentElement.classList.add("dark")
        }
        else{
            document.documentElement.classList.remove("dark")
        }

        //get the theme value from Local Storage
        const storedTheme = localStorage.getItem('BestBikeDefaultTheme');
        setTheme(storedTheme);

    }, [theme])

    const ThemeChange = () => {
        setTheme(theme === "dark" ? "Light" : "dark");

        //set the theme value to Local Storage
        //localStorage.setItem('MyTaskManagerTheme', theme === "dark" ? "Light" : "dark" )
        
    }

    const handleThemeSwitch = () => {
        ThemeChange()
    }
    // Theme Toggle Code Ends









    
    const AuthInfo = {user, loading, setLoading, loading1, setLoading1, createUser, userLogin, signOutUser, googleSignIn, theme, ThemeChange, handleThemeSwitch}
    
    
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;