import React from "react";
import "./Cart.css";

const Cart = (props) => {
  const cart = props.cart;
  console.log(cart);
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total = total + product.price * product.quantity;
    // debugger;
  }

  let shipping = 0;
  if (total > 0 && total < 10) {
    shipping = 4.99;
  } else if (total > 20 && total < 99) {
    shipping = 20.9;
  } else if (total > 100) {
    shipping = 0;
  }

  const tax = total / 10;

  return (
    <div>
      <div className="cart-box">
        <h3>Order Summery</h3>
        <h4> Items Ordered: {cart.length} </h4>
        <h4>Product Price: {total.toFixed(2)}</h4>
        <h4>Shipping Cost: {shipping.toFixed(2)}</h4>
        <h4>Tax: {tax.toFixed(2)}</h4>
        <h2>Total Price: ${(total + shipping + tax).toFixed(2)}</h2>
      </div>
      <br />
      <br />
      <div>{props.children}</div>
    </div>
  );
};

export default Cart;
