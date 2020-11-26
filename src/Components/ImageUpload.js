import React, { useState } from "react";
import { storage } from "../firebase";
import { db } from "../firebase";

function ImageUpload({
  id,
  productname,
  productdesc,
  productprice,
  productrating,
}) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);

  //Adding Product Product image function
  const handleChange = (e) => {
    if (e.target.files[0]) {
      const pickedImage = e.target.files[0];
      setImage(pickedImage);
    }
  };

  console.log(image);

  const handleUpload = () => {
    if (image?.size < 100000) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function ...
          const progresstracking = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progresstracking);
        },
        (error) => {
          // Error function ...
          console.log(error);
        },
        () => {
          // complete function ...
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
            });
        }
      );
    } else {
      setError("the image size is more than 100kb");
    }
  };

  //Adding product to the datastore
  const inputValue =
    id && productname && productdesc && productprice && productrating;
  const AddingProductToDb = (event) => {
    event.preventDefault();
    if (inputValue !== "") {
      db.collection("products").add({
        id: id,
        productname: productname,
        productdesc: productdesc,
        productimg: url,
        productprice: productprice,
        productrating: productrating,
      });

      event.target.value = "";
    } else {
      window.alert("can't be empty");
    }
  };

  return (
    <>
      <div className="center">
        <h2 className="green-text">Upload product image</h2>

        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input type="file" onChange={handleChange} />
          </div>
          {error && <p>{error}</p>}
          <div className="row">
            <progress
              value={progress}
              max="100"
              style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
            >
              {" "}
              {progress}{" "}
            </progress>
          </div>
        </div>
        <button onClick={handleUpload} className="waves-effect waves-light btn">
          Upload
        </button>

        <br />
        <img
          src={url || "https://via.placeholder.com/400x300"}
          alt="Uploaded Images"
          height="300"
          width="400"
        />
      </div>
      <div>
        <button onClick={AddingProductToDb}>Add</button>
      </div>
    </>
  );
}

export default ImageUpload;
