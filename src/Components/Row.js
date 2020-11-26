import React from "react";
import "./ProductTable.css";

//Props is passed from Table Row to Render each Row

function Row({
  id,
  productimg,
  productdesc,
  productprice,
  productname,
  productrating,
  username,
  useremail,
  userId,
}) {
  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  return (
    <tr>
      {id ? <td>{id}</td> : ""}
      {productimg ? (
        <td>{truncateString(productimg, 10)}</td>
      ) : (
        <td>{username}</td>
      )}
      {productdesc ? (
        <td>{truncateString(productdesc, 30)}</td>
      ) : (
        <td>{useremail}</td>
      )}
      {productprice ? <td>{productprice}</td> : <td>{userId}</td>}
      {productname ? <td>{productname}</td> : ""}
      {productrating ? <td>{productrating}</td> : ""}
    </tr>
  );
}

export default Row;
