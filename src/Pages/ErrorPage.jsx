import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

let ErrorPage = () => {
  return (
    <>
      <header className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-black text-center">
          Error 404 Page Not Found
        </h1>
      </header>
      <div className="button-form-container mt-5 text-center">
        <NavLink to={"/login"} className="rounded-button mt-3">
          Go To Login Page
        </NavLink>
      </div>
    </>
  );
};

export default ErrorPage;
