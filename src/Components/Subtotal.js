import React from "react";
import CurrencyFormat from "react-currency-format";
import "./Subtotal.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";

function Subtotal({ noOfItem, sum }) {
  const [{ user, basket }] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <div>
            <p>
              Subtotal ( {noOfItem} item) : <strong>{sum}</strong>
            </p>

            <small className="subtotal_gift">
              <input type="checkbox" /> This order contains a gift
            </small>
            <Link to={user ? "/Payment" : "/login"}>
              <button>Proceed to checkout</button>
            </Link>
          </div>
        )}
        decimalScale={2}
        value={sum}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Subtotal;
