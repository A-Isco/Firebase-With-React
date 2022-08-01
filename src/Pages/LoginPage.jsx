import React, { useEffect, useState } from "react";
import { app, database } from "../firebaseConfig";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";

let LoginPage = () => {
  const { auth } = useContext(AuthContext);
  let navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { dispatch } = useContext(AuthContext);

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };
    setData({ ...data, ...inputs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          const response = signInWithEmailAndPassword(
            auth,
            data.email,
            data.password
          );
          navigate("/home");
        })
        .catch((error) => {
          let errorCode = error.code.split("auth/")[1].split("-").join(" ");
          setErrorMessage(errorCode);
        });

      console.log("Logged In");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async (event) => {
    setLoading(true);
    let googleProvider = new GoogleAuthProvider();

    try {
      const response = await signInWithPopup(auth, googleProvider);
      dispatch({ type: "LOGIN", payload: response.user });
      console.log("Logged In");
      navigate("/home");
    } catch (error) {
      let errorCode = error.code.split("auth/")[1].split("-").join(" ");
      setErrorMessage(errorCode);
    }
    setLoading(false);
  };

  return (
    <div>
      <header className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-white text-center">
          Login Page
        </h1>
      </header>
      <div className="form-container">
        <section>
          <h3 className="font-bold text-2xl">Welcome to Startup</h3>
          <p className="text-gray-600 pt-2">Login to your account</p>
        </section>

        <section className="mt-10">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="field-container-form">
              <input
                className="input-form"
                type="email"
                placeholder="Email"
                name="email"
                onChange={(event) => handleInputs(event)}
              />
            </div>
            <div className="field-container-form">
              <input
                className="input-form"
                type="password"
                placeholder="Password"
                name="password"
                onChange={(event) => handleInputs(event)}
              />
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="button-form"
            >
              Login
            </button>
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="button-form mt-5"
            >
              Login with Google
            </button>
            <div className="button-form-container mt-5 text-center">
              <NavLink to={"/signup"} className="rounded-button mt-3">
                Create Account
              </NavLink>
            </div>

            {errorMessage !== "" ? (
              <div className=" error-container">
                {errorMessage == "internal error"
                  ? "Email or Password cannot be empty"
                  : errorMessage}
              </div>
            ) : null}
          </form>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
