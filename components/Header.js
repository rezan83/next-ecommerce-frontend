import { signIn, signOut, useSession } from "next-auth/client";
import { useRecoilValue } from "recoil";
import { cartCount } from "../store";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
import Link from "next/link";

const Header = () => {
  const [session, loading] = useSession();
  const {count} = useRecoilValue(cartCount);
  // const { user } = useContext(AuthContext);
  return (
    <header>
      <nav>
        <Link href="/">
          <a>
            <h1>NextStrapi Ecommerce</h1>
          </a>
        </Link>

        {session ? (
          <>
            <Link href="/account">
              <a>account</a>
            </Link>
            <Link href="/cart">
              <a>Cart: {count}</a>
            </Link>
          </>
        ) : (
          <Link href="/login">
            <a>login</a>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
