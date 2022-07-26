import React, { useEffect, useState } from "react";
import { app, database } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

let SignPage = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  let navigate = useNavigate();

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };
    setData({ ...data, ...inputs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(response.user.email);
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
          SignUp Page
        </h1>
      </header>
      <div className="form-container">
        <section>
          <h3 class="font-bold text-2xl">Welcome to Startup</h3>
          <p class="text-gray-600 pt-2">Create new account</p>
        </section>

        <section className="mt-10">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div class="field-container-form">
              <input
                className="input-form"
                type="email"
                placeholder="Email"
                name="email"
                onChange={(event) => handleInputs(event)}
              />
            </div>
            <div class="field-container-form">
              <input
                className="input-form"
                type="password"
                placeholder="Password"
                name="password"
                onChange={(event) => handleInputs(event)}
              />
            </div>
            <button
              className="button-form"
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              Sign Up
            </button>

            {errorMessage !== "" ? <div>{errorMessage}</div> : null}
          </form>
        </section>
      </div>
    </div>
  );
};

export default SignPage;
