import React from "react";
import Basket from "./Basket";
import Subtotal from "./Subtotal";
import "./Checkout.css";
import { useStateValue } from "../StateProvider";
import { Flipped } from "react-flip-toolkit";

export const sum = (basket) =>
  basket?.reduce((total, initial) => initial.price + total, 0);

function Checkout() {
  const [{ basket }] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <div className="checkout__right">
          <Subtotal noOfItem={basket?.length} sum={sum(basket)} />
        </div>
        <div className="checkout__subtotal">
          <h3 className="checkout_title">Your Shopping Cart</h3>

          {basket.map((basket) => (
            <Flipped flipId={`element-${basket?.id}`} stagger>
              <Basket
                id={basket?.id}
                title={basket?.title}
                image={basket?.image}
                price={basket?.price}
                rating={basket?.rating}
                hideRemoveButton
              />
            </Flipped>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
