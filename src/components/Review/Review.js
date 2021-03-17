import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import fakeData from "../../fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import { Link, useHistory } from "react-router-dom";
import PlaceOrderImage from "../../images/giphy.gif";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [placedOrder, setPlacedOrder] = useState(false);
  const history = useHistory();

  const handleProceedCheckout = () => {
    history.push("/shipment");
  };
  const handleRemoveProduct = (key) => {
    const removeItem = cart.filter((item) => item.key !== key);
    setCart(removeItem);
    removeFromDatabaseCart(key);
  };

  useEffect(() => {
    const savedCart = getDatabaseCart();
    console.log(savedCart);
    const productKeys = Object.keys(savedCart);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
    // console.log(cartProducts);
  }, []);

  // const thankYou = () => {
  //   <img src={PlaceOrderImage} alt="" />;
  // };
  let thankYou;

  if (placedOrder) {
    thankYou = <img src={PlaceOrderImage} alt="" />;
  }

  return (
    <div className="shop-container">
      <div className="product-container">
        <h1>Cart Items: {cart.length}</h1>
        {cart.map((pd) => (
          <ReviewItem
            handleRemoveProduct={handleRemoveProduct}
            key={pd.key}
            product={pd}
          ></ReviewItem>
        ))}
        {thankYou}
      </div>
      <div>
        <Cart cart={cart}>
          <button onClick={handleProceedCheckout} className="review-order-btn">
            Proceed Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
