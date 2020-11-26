import React from "react";
import Row from "./Row";
import "./ProductTable.css";

const TableRow = ({ product, custList }) => (
  <tbody>
    {product ? (
      <Row
        id={product.product.id}
        productimg={product.product.productimg}
        productdesc={product.product.productdesc}
        productprice={product.product.productprice}
        productrating={product.product.productrating}
        productname={product.product.productname}
      />
    ) : (
      <Row
        username={custList?.custList?.username}
        useremail={custList?.custList?.useremail}
        userId={custList?.custList?.userId}
      />
    )}
    {console.log(custList)}
  </tbody>
);

export default TableRow;
