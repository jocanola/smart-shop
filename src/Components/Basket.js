import React from "react";
import "./Basket.css";
import { useStateValue } from "../StateProvider";
import { Flipped } from "react-flip-toolkit";
import CurrencyFormat from "react-currency-format";

function Basket({ id, title, price, image, rating, hideRemoveButton }) {
  const [{ user }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="basket">
      <div className="basket__img">
        <img src={image} alt="iphone 12" />
      </div>

      <div className="basket__info">
        <p>
          <strong>{title}</strong>
          is the incredible products everyone always want to buy only a few left
          in store purchase your own and will be delivered to your door step
        </p>
        <CurrencyFormat
          value={price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₦"}
          renderText={(price) => <strong>{price}</strong>}
        />

        <div className="basket__star">
          {Array(Number(rating))
            .fill()
            .map((_, i) => (
              <p>
                <span role="img">⭐</span>
              </p>
            ))}
        </div>
        {hideRemoveButton && (
          <button style={{ marginLeft: "5px" }} onClick={removeFromBasket}>
            Remove from the basket
          </button>
        )}
      </div>
    </div>
  );
}

export default Basket;
