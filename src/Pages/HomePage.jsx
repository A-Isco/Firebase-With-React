import React, { useEffect, useState, useContext } from "react";
import { app, database, storage } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { list, ref, deleteObject } from "firebase/storage";
import { async } from "@firebase/util";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Markup } from "interweave";
import NavBar from "../componentes/NavBar";

let HomePage = () => {
  const { currentUser } = useContext(AuthContext);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [content, setContent] = useState(null);
  const [view, setView] = useState(null);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  useEffect(() => {
    const unsub = onSnapshot(
      doc(database, "content", "contentId"),
      (doc) => {
        setView(doc.data().content);
        console.log(doc.data().content);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  const handleSave = async () => {
    try {
      const res = await setDoc(doc(database, "content", "contentId"), {
        content,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <NavBar />
      <section className="text-center mt-8 ">
        <h3 className="font-bold text-4xl mt-3">Home Page</h3>
      </section>
      <div className="editor-container">
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
        <button className="blue-button " onClick={handleSave}>
          Save
        </button>
      </div>
      <div className="html-container">
        <Markup content={view} />
      </div>
    </div>
  );
};

export default HomePage;
