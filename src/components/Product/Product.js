import React from "react";
import "./Product.css";
const Product = (props) => {
  const { img, name, seller, price, stock } = props.product;
  return (
    <div className="product">
      <div className="product-img">
        <img src={img} alt="" />
      </div>
      <div>
        <div className="product-name">
          <h4>{name}</h4>
        </div>
        <div>
          <p>
            <small>by {seller}</small>
          </p>
          <br />
          <h2>${price}</h2>
          <br />
          <p>
            <small>Only {stock} left in stock. Order soon.</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
