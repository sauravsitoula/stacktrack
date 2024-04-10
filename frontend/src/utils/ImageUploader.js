import { useCallback, useState } from "react";
import React from "react";
import { useDropzone } from "react-dropzone";
import "./ImageUploader.css";
import { uploadToFirebase } from "./UploadFirebase";

const ImageUploader = ({ setParentState }) => {
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    if (image) {
      var downloadURL = await uploadToFirebase(image);
      console.log("downloadURL: " + downloadURL);
      setParentState((prevState) => {
        return { ...prevState, imageURL: downloadURL };
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
      <button onClick={handleSubmit}>upload</button>
    </div>
  );
};

export default ImageUploader;
