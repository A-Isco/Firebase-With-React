import React, { useEffect, useState } from "react";
import { app, database } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

let HomePage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="container-sm  p-5">
      <h1>Home Page</h1>
      <h2>Hi : {`${currentUser.email}`}</h2>
    </div>
  );
};

export default HomePage;
