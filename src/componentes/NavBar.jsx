import React, { useEffect, useState } from "react";
import { app, database, storage } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

let NavBar = () => {
  const { currentUser } = useContext(AuthContext);

  const { dispatch } = useContext(AuthContext);

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <nav class="bg-gray-800 -mt-20">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div class="hidden sm:block sm:ml-6">
              <div class="flex space-x-4">
                <NavLink
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg	 font-medium"
                  to={"/home"}
                >
                  Home
                </NavLink>

                <NavLink
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg	 font-medium"
                  to={"/photos"}
                >
                  Photos
                </NavLink>
              </div>
            </div>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="bg-gray-800 p-1 rounded-full text-lg	mr-5 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              Hi : {`${currentUser.email}`}
            </div>
            <button
              onClick={handleLogOut}
              type="button"
              class="bg-gray-800 p-1 rounded-full text-lg	 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
