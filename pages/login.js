import { signIn, signOut, useSession } from "next-auth/client";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import Head from "next/head";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const { loginUser } = useContext(AuthContext);
  const [session, loading] = useSession();
  
  const router = useRouter();

  if (session) {
    router.push('/')
  }
  const handelSubmit = (event) => {
    event.preventDefault();
    loginUser(email);
  };

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="login to make purchaces" />
      </Head>

      <h2>Login</h2>

      <div id="gSignInWrapper">
        <span className="label">Sign in with:</span>
        <div
          onClick={() => signIn("google")}
          id="customBtn"
          className="customGPlusSignIn"
        >
          <span className="icon">
            <img src="g-logo.png" alt="" />
          </span>
          <span className="buttonText">Google</span>
        </div>
      </div>
      <div id="name"></div>

      {/* <form onSubmit={handelSubmit}>
        <input
          type="email"
          name=""
          id=""
          placeholder="example@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">login</button>
      </form> */}
    </div>
  );
};

export default Login;
