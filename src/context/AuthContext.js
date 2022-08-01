import { createContext, useEffect, useReducer, useState } from "react";
import { app, database } from "../firebaseConfig";
import AuthReducer from "./AuthReducer";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [auth, setAuth] = useState(getAuth());

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log("observer works");
      setCurrentUser(user);
    });
    return () => {
      unsub();
    };
  }, []);

  const value = {
    currentUser,
    auth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
