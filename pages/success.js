import { useEffect,useState} from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/client";
import { imageUrl, twoDecimals, API_URL, STRIPE_PK } from "../helpers";

import Head from "next/head";

const succcess = () => {
   const [session, loading] = useSession();
  const router = useRouter();
  const { session_id } = router.query;
  const [paid, setPaid] = useState(false);
  const [loadingpaidStatus, setloadingPaidStatus] = useState(true);

  useEffect(async () => {
    let confirmUrl = `${API_URL}/orders/confirm/`;
    if (session) {
      console.log(session);
      let bearer = "Bearer " + session.jwt;
      let header = {
        method: "POST",
        body: JSON.stringify({ checkout_session: session_id }),
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
      };

      let res = await fetch(confirmUrl, header);
      let orderStatus = await res.json();
      console.log("orderStatus", orderStatus);
      setPaid(orderStatus);
      setloadingPaidStatus(false);
    }
    

    return () => {
      // cleanup;
    };
  }, [session_id, session]);

  return (
    <div>
      <Head>
        <title>Thanks for your purchase</title>
        <meta name="description" content="Thanks for your purchase" />
      </Head>
      {loadingpaidStatus && <h1>Please Wait</h1>}
      {!paid && !loadingpaidStatus && <h1>something went wrong!</h1>}
      {paid && <h1>success</h1>}
    </div>
  );
};

export default succcess;
