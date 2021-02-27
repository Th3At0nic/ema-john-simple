import React from "react";

const Cart = (props) => {
  const cart = props.cart;
  return (
    <div>
      <h3>Order Summery</h3>
      <h4> Items Ordered: {cart.length} </h4>{" "}
    </div>
  );
};

export default Cart;
