import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import SignPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import PhotosPage from "./Pages/PhotosPage";
import CreatePhotoPage from "./Pages/CreatePhotoPage";
import HomePage from "./Pages/HomePage";
import ErrorPage from "./Pages/ErrorPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const { auth } = useContext(AuthContext);
  let currentUser = auth.currentUser;

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={currentUser ? <HomePage /> : <LoginPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignPage />} />
          <Route
            path="/photos"
            element={
              <RequireAuth>
                <PhotosPage />
              </RequireAuth>
            }
          />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/photo/create"
            element={
              <RequireAuth>
                <CreatePhotoPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
