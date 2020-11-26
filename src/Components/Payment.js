import React from "react";
import Basket from "./Basket";
import { useStateValue } from "../StateProvider";
import paystackimg from "../media/payment.png";
// import CurrencyFormat from "react-currency-format";
import { sum } from "./Checkout";
import { useHistory } from "react-router-dom";
import "./Payment.css";
import { usePaystackPayment } from "react-paystack";
import { db } from "../firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const history = useHistory();

  // const [error, setError] = useState(null);

  //PayStack Section
  console.log(sum(basket) * 100);
  const config = {
    reference: new Date().getTime(),
    email: `${user?.email}`,
    amount: sum(basket) * 100,
    publicKey: "pk_test_4c8c5810190d1875119f62616a52eef06450d1a4",
  };

  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.

    dispatch({
      type: "EMPTY_BASKET",
    });

    history.replace("/orders");

    db.collection("users")
      .doc(user?.uid)
      .collection("order")
      .doc(reference.reference)
      .set({
        basket: basket,
        amount: sum(basket) * 100,
        created: new Date().getTime(),
      });

    console.log(reference.reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.

    console.log("closed");
  };

  const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div className="payment__method">
        <input
          type="radio"
          class="paystack_button"
          onChange={() => {
            initializePayment(onSuccess, onClose);
          }}
        />
        <img src={paystackimg} width="150px" height="50px" alt="paystack" />
      </div>
    );
  };

  return (
    //
    <div className="payment">
      {/*Sectional*/}
      <div className="payment_option">
        {/*title*/}
        <div className="payment_title">
          <h3>Your Address</h3>
        </div>

        <div className="payment_optionAddress">
          <p>
            <label>
              <strong>Primary Address</strong>
            </label>
            : No. 33, 34 Stadium Shopping complex, Durbar Oyo.
          </p>
          <p>
            <label>
              <strong>Alternate Address</strong>
            </label>
            : No. 33, 34 Stadium Shopping complex, Durbar Oyo.
          </p>
          <p>
            <label>
              <strong>Postal Code: </strong>
            </label>
            211101
          </p>
          <p>
            <label>
              <strong>Phone No</strong>
            </label>
            : 08168338823
          </p>
        </div>
      </div>

      <div className="payment_option">
        <div className="payment_title">
          <h3>Review product</h3>
        </div>

        <div className="payment_optionBasket">
          {basket.map((basket) => (
            <Basket
              id={basket?.id}
              title={basket?.title}
              image={basket?.image}
              price={basket?.price}
              rating={basket?.rating}
              hideRemoveButton
            />
          ))}
        </div>
      </div>

      <div className="payment_option">
        <div className="payment_title">
          <h3>Payment Method</h3>
        </div>

        <div className="payment_optionCard">
          {/*payment button*/}
          <PaystackHookExample />
        </div>
      </div>
    </div>
  );
}

export default Payment;
