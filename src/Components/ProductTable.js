import React, { useState, useEffect } from "react";
import "./ProductTable.css";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import TableRow from "./TableRow";
import AlertDialogSlide from "./AddProduct";

function ProductTable({ productList, userList }) {
  const [products, setProducts] = useState([]);
  const [listOfCustomer, setListOfCustomer] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    db.collection("products").onSnapshot((snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          product: doc.data(),
        }))
      );
    });

    db.collection("admin").onSnapshot((snapshot) => {
      setListOfCustomer(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          custList: doc.data(),
        }))
      );
    });
  }, [user]);

  // console.log(products[0]?.product);

  return (
    <div className="table">
      <AlertDialogSlide />
      <table>
        <thead>
          {productList ? <th>Product Id</th> : ""}
          {productList ? <th>Products name</th> : <th>Customer name</th>}
          {productList ? <th>Product Img</th> : <th>Customer email.</th>}
          {productList ? <th>Products desc.</th> : <th>customer Id</th>}
          {productList ? <th>Product Price ($) </th> : ""}
          {productList ? <th>Product Rating</th> : ""}
        </thead>
        {productList &&
          products.map((product) => (
            <TableRow key={product?.id} product={product} />
          ))}

        {userList &&
          listOfCustomer.map((custList) => (
            <TableRow key={listOfCustomer?.id} custList={custList} />
          ))}
      </table>
    </div>
  );
}

export default ProductTable;
