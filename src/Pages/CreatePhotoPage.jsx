import React, { useEffect, useState } from "react";
import { app, database, storage } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";

let CreatePhotoPage = () => {
  // const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState({
    title: "",
    photoUrl: "",
  });

  let navigate = useNavigate();

  const [file, setFile] = useState("");
  const [percentage, setPercentage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const uploadFile = () => {
      const uniqueName = new Date().getTime() + file.name;
      const storageRef = ref(storage, uniqueName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPercentage(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log("error");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((data) => ({ ...data, photoUrl: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };
    setData({ ...data, ...inputs });
  };

  const handleAddPhoto = async (e) => {
    e.preventDefault();

    if (!file || !data.photoUrl) {
      setErrorMessage("Photo and Details cannot be empty");
      return;
    }

    try {
      const res = await addDoc(collection(database, "photos"), {
        ...data,
        date: moment.tz().unix(),
      });
      console.log(res);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-sm  p-5">
      <h1>Create Photo</h1>
      <form onSubmit={handleAddPhoto}>
        <input
          type="text"
          name="title"
          onChange={(event) => handleInputs(event)}
        />
        <input
          type="file"
          name="photoUrl"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          disabled={percentage !== null && percentage < 100}
          type="submit"
        >
          Submit
        </button>
        {errorMessage !== "" ? <div>{errorMessage}</div> : null}
      </form>
    </div>
  );
};

export default CreatePhotoPage;
