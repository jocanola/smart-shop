import React from "react";
import Basket from "./Basket";
import "./Order.css";

function Order({ order }) {
  console.log(order);

  const renderDate = new Date(order.data.created);
  return (
    <div className="order">
      <h2>Order</h2>
      <div className="order_title">
        <p>Date ordered : {renderDate.toDateString()}</p>
        <p>order-id : {order.id}</p>
      </div>
      {order.data.basket?.map((order) => (
        <Basket
          id={order.id}
          title={order.title}
          image={order.image}
          price={order.price}
          rating={order.rating}
        />
      ))}
    </div>
  );
}

export default Order;
