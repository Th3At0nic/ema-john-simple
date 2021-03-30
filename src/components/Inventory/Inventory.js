import React from "react";

const Inventory = () => {
  const handleAddProduct = () => {
    const product = {};
    fetch("http://localhost:5000/addProducts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    });
    console.log("clicked");
  };
  return (
    <div>
      <form action="">
        <h4>
          <span>Name: </span>
          <input type="text" />
        </h4>
        <h4>
          <span>Price: </span>
          <input type="text" />
        </h4>
        <h4>
          <span>Quantity: </span>
          <input type="text" />
        </h4>
        <h4>
          <span>Product Image: </span>
          <input type="file" />
        </h4>
        <button onClick={handleAddProduct}>Add Product</button>
      </form>
    </div>
  );
};

export default Inventory;
