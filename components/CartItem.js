import React, { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  cartItems as initialCartItems,
  inCart as initialinCart,
} from "../store";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { imageUrl, twoDecimals, API_URL } from "../helpers";

const CartItem = ({
  product,
  addToCart,
  removeFromCart,
  handelQuantityChange,
}) => {
  const cartItems = useRecoilValue(initialCartItems);
  const [inCart, setinCart] = useRecoilState(initialinCart(product.id));
  console.log(!!addToCart, product.name, inCart);
  const toggleIncart = (product) => {
    setinCart(!inCart);
    console.log(!!addToCart, product.name, inCart);
    if (addToCart) {
      addToCart(product);
    } else {
      removeFromCart(product);
    }
  };
  return (
    <div>
      <div className={styles.product}>
        <div className={styles.product__Row}>
          <div className={styles.product__ColImg}>
            <Link href={`products/${product.slug}`}>
              <img
                src={imageUrl(product.image)}
                alt={product.name + " image"}
              />
            </Link>
          </div>
          <div className={styles.product__Col}>
            {product.name} ${twoDecimals(product.price)}
          </div>
        </div>
        <div className={styles.product__Row}>
          {addToCart && inCart && (
            <>
              <button onClick={() => toggleIncart(product)}>
                Remove from Cart
              </button>
              <div>&#10003;</div>
            </>
          )}
          {addToCart && !inCart && (
            <button onClick={() => toggleIncart(product)}>Add To Cart</button>
          )}
          {removeFromCart && (
            <div>
              <input
                type="number"
                name=""
                id=""
                min="1"
                onChange={(e) => handelQuantityChange(e, product)}
                value={product.quantity}
              />
              <button onClick={() => toggleIncart(product)}>Remove</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
