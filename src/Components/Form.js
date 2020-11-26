import React, { useState } from "react";
import "./form.css";
import ImageUpload from "./ImageUpload";

const AddProductForm = () => {
  const [id, setId] = useState("");
  const [productname, setProductname] = useState("");
  const [productdesc, setProductdesc] = useState("");
  const [productprice, setProductprice] = useState("");
  const [productrating, setProductrating] = useState("");

  //Adding Product Product image function

  return (
    <div className="form">
      {" "}
      <div className="form__input">
        <h4>id</h4>
        <input
          type="text"
          placehoder="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="form__input">
        <h4>Product Name</h4>
        <input
          type="text"
          placehoder="Product Name"
          value={productname}
          onChange={(e) => setProductname(e.target.value)}
        />
      </div>
      <div className="form__input">
        <h4>Product Description</h4>
        <input
          type="text"
          placehoder="Product Description"
          value={productdesc}
          onChange={(e) => setProductdesc(e.target.value)}
        />
      </div>
      <div className="form__input">
        <h4>Product Price</h4>
        <input
          type="text"
          placehoder="Product Price"
          value={productprice}
          onChange={(e) => setProductprice(e.target.value)}
        />
      </div>
      <div className="form__input">
        <h4>Product Rating</h4>
        <input
          type="text"
          placehoder="Product Rating"
          value={productrating}
          onChange={(e) => setProductrating(e.target.value)}
        />
      </div>
      <div className="form__input">
        <ImageUpload
          id={id}
          productname={productname}
          productdesc={productdesc}
          productprice={productprice}
          productrating={productrating}
        />
      </div>
    </div>
  );
};

export default AddProductForm;
