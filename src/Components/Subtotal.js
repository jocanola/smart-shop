import React from "react";
import CurrencyFormat from "react-currency-format";
import "./Subtotal.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";

function Subtotal({ noOfItem, sum }) {
  const [{ user, basket }] = useStateValue();

  return (
    <div className="subtotal">
      <div>
        <p>
          Subtotal ( {noOfItem} item) :
          <CurrencyFormat
            value={sum}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₦"}
            renderText={(sum) => <strong>{sum}</strong>}
          />
        </p>

        <Link to={user ? "/Payment" : "/login"}>
          <button>Proceed to Payment</button>
        </Link>
      </div>
    </div>
  );
}

export default Subtotal;
