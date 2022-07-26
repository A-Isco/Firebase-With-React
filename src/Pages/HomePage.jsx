import React, { useEffect, useState } from "react";
import { app, database, storage } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { collection, doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { list, ref, deleteObject } from "firebase/storage";
import moment from "moment-timezone";
import { async } from "@firebase/util";

let HomePage = () => {
  const { currentUser } = useContext(AuthContext);
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
    <div className="container-sm  p-5">
      <h1>Home Page</h1>
      <h2>Hi : {`${currentUser.email}`}</h2>
      {data &&
        data.map((item) => (
          <div key={item.id}>
            <img src={item.photoUrl} alt="photo" />
            <p>{item.title}</p>
            <p>{moment.unix(item.date).format()}</p>
            <button onClick={() => handleDelete(item)}>Delete</button>
          </div>
        ))}
    </div>
  );
};

export default HomePage;
