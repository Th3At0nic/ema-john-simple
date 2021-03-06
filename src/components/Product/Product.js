import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";
import { Link } from "react-router-dom";
const Product = (props) => {
  const { img, name, seller, price, stock, key } = props.product;
  // console.log(props);

  return (
    <div className="product">
      <div className="product-img">
        <div>
          <img src={img} alt="" />
        </div>
      </div>
      <div>
        <div className="product-name">
          {/* <h4>{name}</h4> */}
          <h4>
            <Link to={"/product/" + key}>{name}</Link>{" "}
          </h4>
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
          {props.showAddToCart && (
            <button
              className="cart-button"
              onClick={() => props.handleAddProduct(props.product)}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
