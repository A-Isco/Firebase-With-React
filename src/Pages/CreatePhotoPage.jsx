import React, { useEffect, useState } from "react";
import { app, database, storage } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";
import NavBar from "../componentes/NavBar";

let CreatePhotoPage = () => {
  const [data, setData] = useState({
    title: "",
    photoUrl: "",
  });

  let navigate = useNavigate();

  const [file, setFile] = useState("");
  const [percentage, setPercentage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const uploadFile = () => {
      const uniqueName = new Date().getTime() + file.name;
      const storageRef = ref(storage, uniqueName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      setLoading(true);

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
            setLoading(false);
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

    if (!file || !data.title) {
      setErrorMessage("Photo and Details cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const res = await addDoc(collection(database, "photos"), {
        ...data,
        date: moment.tz().unix(),
      });
      navigate("/photos");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />

      <div className="editor-container">
        <section className="text-center">
          <h3 className="font-bold text-2xl">Create Photo</h3>
        </section>

        <section className="mt-10">
          <form className="flex flex-col" onSubmit={handleAddPhoto}>
            <div className="field-container-form">
              <input
                className="input-form"
                type="text"
                name="title"
                onChange={(event) => handleInputs(event)}
              />
            </div>
            <div className="field-container-form">
              <input
                type="file"
                name="photoUrl"
                accept=".jpg,.png,.jpeg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button
              className="button-form"
              disabled={(percentage !== null && percentage < 100) || loading}
              type="submit"
            >
              Create Photo
            </button>
            {errorMessage !== "" ? (
              <div className=" error-container">{errorMessage}</div>
            ) : null}
          </form>
        </section>
      </div>
    </>
  );
};

export default CreatePhotoPage;
