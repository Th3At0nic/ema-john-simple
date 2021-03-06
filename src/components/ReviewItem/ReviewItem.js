import React from "react";

const ReviewItem = (props) => {
  // console.log(props);
  const { name, quantity, key } = props.product;
  const reviewItemStyle = {
    borderBottom: "1px solid gray",
    marginBottom: "5px",
    paddingBottom: "5px",
    marginLeft: "200px",
  };
  return (
    <div style={reviewItemStyle}>
      <h4 className="product-name">{name}</h4>
      <p>Quantity: {quantity}</p>
      <br />
      <br />
      <button
        onClick={() => props.handleRemoveProduct(key)}
        className="cart-button"
      >
        Remove Item
      </button>
    </div>
  );
};

export default ReviewItem;
