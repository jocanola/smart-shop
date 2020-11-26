import React from "react";
import "./Product.css";
import { useStateValue } from "../StateProvider";

function Product({ id, title, price, image, rating, desc }) {
  const [state, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        price: Number(price),
        image: image,
        rating: rating,
        desc: desc,
      },
    });
  };

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  return (
    <div className="product">
      <div className="product_info">
        <p>
          {" "}
          <strong> {title} </strong> {truncateString(desc, 20)}
        </p>
        <p>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product_star">
          {Array(Number(rating))
            .fill()
            .map((_, i) => (
              <p>
                <span role="img">⭐</span>
              </p>
            ))}
        </div>
      </div>
      <img src={image} alt="productImage" />
      <button onClick={addToBasket}>Add to Cart</button>
    </div>
  );
}

export default Product;
