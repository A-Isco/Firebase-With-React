import React, { useEffect, useState } from "react";
import { app, database, storage } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { collection, doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { list, ref, deleteObject } from "firebase/storage";
import moment from "moment-timezone";
import { async } from "@firebase/util";
import NavBar from "../componentes/NavBar";
import { NavLink } from "react-router-dom";

let PhotosPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(database, "photos"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  console.log(data);

  const handleDelete = async (item) => {
    try {
      await deleteDoc(doc(database, "photos", item.id));
      const desertRef = ref(storage, item.photoUrl);
      deleteObject(desertRef)
        .then(() => {
          console.log("file deleted");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container-sm  p-5">
        <section className="text-center mb-10">
          <h3 className="font-bold text-4xl mt-3 mb-8 ">Photos Page</h3>
          <NavLink className="mt-5  blue-button" to={"/photo/create"}>
            Add Photo
          </NavLink>
        </section>

        <div className="photos-container flex flex-wrap justify-evenly">
          {data &&
            data.map((item) => (
              <div key={item.id}>
                <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 text-center mt-7">
                  <img
                    className="rounded-t-lg object-fill h-48 w-96"
                    src={item.photoUrl}
                    alt="photo"
                  />
                  <h5 className="mb-2 mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {moment.unix(item.date).format()}{" "}
                  </p>
                  <button
                    className="mb-4 mt-2 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PhotosPage;
