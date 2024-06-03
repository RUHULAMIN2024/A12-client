import axios from "axios";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loding, setLoding] = useState(true)

    //create user
    const createUser = (email, password) => {
        setLoding(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login user
    const loginUser = (email, password) => {
        setLoding(true);
        return signInWithEmailAndPassword(auth, email, password)

    }

    //google login
    const googleLogin = () => {
        setLoding(true);
        return signInWithPopup(auth, googleProvider)
    }

    //github login
    const githubLogin = () => {
        setLoding(true);
        return signInWithPopup(auth, githubProvider)
    }


    // logout
    const logout = () => {
        setLoding(true);
        signOut(auth)
    }
    
    const userUpdate=(name, photo)=>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
    }

    //observer
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            const userEmail= user?.email || userInfo?.email
            const loggedUser= {email:userEmail}
            
            setUserInfo(user)
            setLoding(false);
            if(user){
                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, loggedUser,{withCredentials:true})
                .then(res=>{
                    console.log(res.data)
                })
            }
            else{
                axios.post(`${import.meta.env.VITE_API_URL}/logout`, loggedUser,{withCredentials:true})
                .then(res=>{
                    console.log(res.data)
                })
            }

        });
        return () => {
            unSubscribe()
        }
    }, []);
    
    
    

    const allValues = {
        createUser,
        loginUser,
        googleLogin,
        githubLogin,
        logout,
        userInfo,
        setUserInfo,
        loding,
        userUpdate,

    }
    return (
        <AuthContext.Provider value={allValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;