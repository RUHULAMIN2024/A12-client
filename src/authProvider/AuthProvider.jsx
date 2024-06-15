import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";

import PropTypes from "prop-types";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  //create user
  const createUser = (email, password) => {
    setUserLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user
  const loginUser = (email, password) => {
    setUserLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //google login
  const googleLogin = () => {
    setUserLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //github login
  const githubLogin = () => {
    setUserLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  // logout
  const logout = () => {
    setUserLoading(true);
    return signOut(auth);
  };

  const userUpdate = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
        // get token and store local storage
        // const userEmail = { email: user?.email };

        // axios.post("/user-login", userEmail).then((res) => {
        //   const resToken = res.data.userToken;
        //   if (resToken) {
        //     localStorage.setItem("userToken", resToken);
        //   }
        // });
      } else {
        setUserInfo(null);
        // localStorage.removeItem("userToken");
      }
      setUserLoading(false);
    });
    return () => {
      return unSubscribe();
    };
  }, [userInfo?.email]);

  const allValues = {
    createUser,
    loginUser,
    googleLogin,
    githubLogin,
    logout,
    userInfo,
    setUserInfo,
    userLoading,
    userUpdate,
  };
  return (
    <AuthContext.Provider value={allValues}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthProvider;
