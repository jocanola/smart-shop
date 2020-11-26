import React, { useState, useEffect } from "react";
import "./Home.css";
import { db } from "../firebase";
import smartshop from "../media/smartshop.png";
import coverimg from "../media/coverimg.jpg";
import Product from "./Product";
import Searchproduct from "./Searchproduct";
import { Flipped } from "react-flip-toolkit";
import ReactLoading from "react-loading";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [search, setSearch] = useState();
  useEffect(() => {
    db.collection("products").onSnapshot((snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          product: doc.data(),
        }))
      );
    });
  });

  var updatedproduct = products.filter((robot) => {
    return robot?.product.productname
      .toLowerCase()
      .includes(searchField.toLowerCase());
  });

  const strategy = {
    onSearchChange: function onSearchChange(e) {
      setSearchField(e.target.value);
      setSearch(true);
    },
    onSortFromHighToLow: function onSortFromHighToLow() {
      updatedproduct = products.sort(function (a, b) {
        const y = b.product.productprice;
        const x = a.product.productprice;
        return Number(y) - Number(x);
      });
      console.log(updatedproduct);
    },
  };

  // const handleSortHighToLow = filteredproduct.product.productprice

  return (
    <section className="home">
      <div
        className="home__cover"
        style={{
          backgroundImage: `url(${coverimg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "top",
        }}
      >
        <div className="home__leftside">
          <img className="home__image" src={smartshop} alt="smartshop" />
        </div>
        <div className="home__rightside">
          <h4>
            We make an incredible products everyone to buy with easy, purchase
            your own and will be delivered to your door step.
          </h4>
          <Searchproduct onSearchChange={strategy.onSearchChange} />
          {/* <button onClick={strategy.onSortFromHighToLow}>sort product</button> */}
        </div>
      </div>

      <div ClassName="container">
        <div className="row justify-content-center">
          {updatedproduct.length < 1 ? (
            <ReactLoading
              type="spinningBubbles"
              color="black"
              height={667}
              width={375}
            />
          ) : (
            ""
          )}
          {updatedproduct?.map((product) => (
            <Flipped
              flipKey={product?.product?.id}
              spring={{ stiffness: 280, damping: 22 }}
              stagger
            >
              <Product
                id={product?.product?.id}
                desc={product?.product?.productdesc}
                title={product?.product?.productname}
                price={product?.product?.productprice}
                image={product?.product?.productimg}
                rating={product?.product?.productrating}
              />
            </Flipped>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
