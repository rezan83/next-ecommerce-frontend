import React, { useState } from "react";
import { signIn, useSession } from "next-auth/client";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartItems as initial, cartCount } from "../store";
import { loadStripe } from "@stripe/stripe-js";
import CartItem from "../components/CartItem";
import Link from "next/link";
import { imageUrl, twoDecimals, API_URL, STRIPE_PK } from "../helpers";

import styles from "../styles/Home.module.css";

let stripePromice = loadStripe(STRIPE_PK);

export default function cart() {
  const [session, loading] = useSession();
  const [cartItems, setCartItems] = useRecoilState(initial);
  const { total, checkoutPost } = useRecoilValue(cartCount);
  console.log("session:", session);

  const removeFromCart = (product) => {
    const index = cartItems.findIndex((item) => item.id === product.id);
    let newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  const handelQuantityChange = (e, product) => {
    const index = cartItems.findIndex((i) => i.id === product.id);
    let newCart = [...cartItems];
    let newProduct = { ...product };
    newProduct.quantity = e.target.value;
    newCart.splice(index, 1, newProduct);
    setCartItems(newCart);
  };

  const checkout = async (e) => {
    e.preventDefault();
    let stripe = await stripePromice;
    console.log("stripe", stripe);
    const checkoutURL = `${API_URL}/orders/`;
    if (session) {
      let bearer = "Bearer " + session.jwt;
      let header = {
        method: "POST",
        body: JSON.stringify(checkoutPost),
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
      };

      let checkoutResp = await fetch(checkoutURL, header);
      checkoutResp = await checkoutResp.json();
      console.log("checkoutResp", checkoutResp);
      const session_id = checkoutResp.id;

      const redirect = await stripe.redirectToCheckout({
        sessionId: session_id,
      });

      // if (redirect.error) {
      //   console.log("error", error);
      // }
      // setOrders(checkoutResp);
    }
  };
  return (
    <div>
      {!cartItems.length && <h4>Your Cart Is Empty</h4>}
      {!!cartItems.length && (
        <>
          {cartItems.map((product) => (
            <div key={product.id}>
              <CartItem
                removeFromCart={removeFromCart}
                product={product}
                handelQuantityChange={handelQuantityChange}
              />
            </div>
          ))}
          <div>
            <h5>total: ${total}</h5>
            <button onClick={checkout}>Cheackout</button>
          </div>
        </>
      )}
    </div>
  );
}
