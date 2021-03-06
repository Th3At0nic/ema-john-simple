import React, { useEffect, useState } from "react";
import fakeData from "../../../fakeData";
import { addToDatabaseCart, getDatabaseCart } from "../../../utilities/databaseManager";
import Cart from "../../Cart/Cart";
import Product from "../../Product/Product";
import "./Shop.css";
const Shop = () => {
  const [cart, setCart] = useState([]);

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

  const handleAddProduct = (product) => {
    let count = 1;
    let newCart;
    const keyToBeAdded = product.key;
    const sameProduct = cart.find((pd) => pd.key === keyToBeAdded);

    if (sameProduct) {
      count = count + 1;
      // count = sameProduct.quantity + 1; //this line is same as line nmbr 17
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== keyToBeAdded);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }

    setCart(newCart);

    addToDatabaseCart(product.key, count);
  };

  const first10 = fakeData.slice(0, 50);
  const [products, setProducts] = useState(first10);

  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            key={product.key}
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
            product={product}
          ></Product>
        ))}
      </div>

      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
