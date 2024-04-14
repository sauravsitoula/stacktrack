import { useCallback, useState } from "react";
import React from "react";
import { useDropzone } from "react-dropzone";
import "./SearchImageUploader.css";
import Loader from "../components/commons/Loader/Loader";
import Modal from "../components/commons/Modal/Modal";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./Firebase";

const ImageUploader = ({ setImageURL, setImageRef }) => {
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});

  const uploadToFirebase = async (image) => {
    let downloadingURL = "";
    const imageRef = ref(storage, v4());
    setImageRef(imageRef);
    try {
      const snapshot = await uploadBytes(imageRef, image);
      downloadingURL = await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setImageURL(downloadingURL);
    return downloadingURL;
  };

  const uploadImage = async (image) => {
    if (image) {
      setLoader(true);
      await uploadToFirebase(image);
      setLoader(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    await uploadImage(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  return (
    <div
      style={{
        width: "45px", // Set the width of the container to 100%
        height: "40px", // Set the height of the container to 100%
        backgroundImage:
          "url('https://firebasestorage.googleapis.com/v0/b/postings-19356.appspot.com/o/icons8-search-image-96.png?alt=media&token=002548ed-7c20-4bdf-b6d3-a3d1a3b6f9ab')",
        backgroundSize: "cover", // Make the background image cover the entire container
        backgroundPosition: "center", // Center the background image
        position: "relative",
        top: "8px",
        right: "42px",
      }}
      className="container"
    >
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
      <div {...getRootProps({ className: "search-dropzone" })}>
        <input {...getInputProps()} />
      </div>
    </div>
  );
};

export default ImageUploader;
