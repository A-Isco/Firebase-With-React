import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
// import { useNavigate } from "react-router-dom";
import SignPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import PhotosPage from "./Pages/PhotosPage";
import CreatePhotoPage from "./Pages/CreatePhotoPage";
import HomePage from "./Pages/HomePage";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
      <BrowserRouter>
        <Routes>
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
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
