import { useCallback, useState } from "react";
import React from "react";
import { useDropzone } from "react-dropzone";
import "./ImageUploader.css";
import { uploadToFirebase } from "./UploadFirebase";
import Loader from "../components/commons/Loader/Loader";
import Modal from "../components/commons/Modal/Modal";

const ImageUploader = ({ setParentState }) => {
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});

  const uploadImage = async () => {
    if (image) {
      setLoader(true);
      var downloadURL = await uploadToFirebase(image);
      setLoader(false);
      setImage(null);
      console.log("downloadURL: " + downloadURL);
      setParentState((prevState) => {
        return { ...prevState, image_url: downloadURL };
      });
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  const removeImage = () => {
    setImage(null);
    setParentState((prevState) => {
      return { ...prevState, imageURL: "" };
    });
  };

  return (
    <div className="container">
      {loader ? <Loader /> : ""}
      {modal.show ? (
        <Modal
          modal={setModal}
          title={modal.title}
          message={modal.message}
          type={modal.type}
        />
      ) : (
        ""
      )}
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an image here, or click to select an image</p>
      </div>
      {image && (
        <div className="preview">
          <img src={image.preview} alt="Preview" />
          <button onClick={removeImage} className="remove-button">
            X
          </button>
        </div>
      )}
      {image ? <button onClick={uploadImage}>upload</button> : <></>}
    </div>
  );
};

export default ImageUploader;
