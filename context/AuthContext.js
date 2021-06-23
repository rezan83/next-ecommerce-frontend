import { createContext, useState } from "react";
import { useRouter } from "next/router";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const router = useRouter();
  /**
   * login user with email
   * @param (string) email
   */
  const loginUser = async (email) => {
    setUser({ email });
    router.push("/");
  };

  /**
   * logout user
   */
  const logoutUser = async () => {
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
