import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import fakeData from "../../fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import { Link } from "react-router-dom";

const Review = () => {
  const [cart, setCart] = useState([]);

  const handleRemoveProduct = (key) => {
    const removeItem = cart.filter((item) => item.key !== key);
    setCart(removeItem);
    removeFromDatabaseCart(key);
  };

  useEffect(() => {
    const savedCart = getDatabaseCart();
    // console.log(savedCart);
    const productKeys = Object.keys(savedCart);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
    // console.log(cartProducts);
  }, []);
  console.log(cart);
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
      </div>
      <div>
        <Cart cart={cart}>
          <Link to="/review">
            <button className="review-order-btn">Place Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
