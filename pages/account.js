import { signOut, useSession } from "next-auth/client";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

const useOrders = (session) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    let ordersUrl = `${process.env.NEXT_PUBLIC_API_URL}/orders`;
    let getOrders = async () => {
      try {
        if (session) {
          let bearer = "Bearer " + session.jwt;
          let header = {
            method: "GET",
            headers: {
              Authorization: bearer,
              "Content-Type": "application/json",
            },
          };

          let ordersResp = await fetch(ordersUrl, header);
          ordersResp = await ordersResp.json();
          setOrders(ordersResp);
        }
      } catch (error) {
        setOrders([]);
      }
    };
    getOrders();
    return () => {};
  }, [session]);
  return orders;
};

const Account = () => {
  const router = useRouter();
  // const { user, logoutUser } = useContext(AuthContext);
  const [session, loading] = useSession();
  let orders = useOrders(session);
  console.log(session);

  return (
    <div>
      <Head>
        <title>Account</title>
        <meta name="description" content="your profile here" />
      </Head>
      {loading && <h2>Please Wait</h2>}

      {session && (
        <>
          <div>
            <h2>Profile</h2>
            <div
              className='profileName'
            >
              <h3>Signed in as {session.user.name} </h3>
              <button onClick={() => signOut()}>Sign out</button>
            </div>
            <h3>Email: {session.user.email}</h3>
            {session.user.image && (
              <img
                src={session.user.image}
                alt={session.user.name + " image"}
              />
            )}
          </div>

          <div>
            <h2>Orders</h2>
            {!orders.length && <h4>Loading orders</h4>}
            {orders &&
              orders.map((order) => {
                return (
                  <div key={order.id}>
                    <h4>Status: {order.status}</h4>
                    <h4>Total: $ {order.total}</h4>
                    <h4>Products</h4>
                    <ul>
                      {order.products.map((p) => {
                        return <li key={p.id}>{p.name}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
