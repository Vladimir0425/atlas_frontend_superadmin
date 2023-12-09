import React, { useEffect, useState } from "react";

import { HttpService } from "../services";

const AuthContext = React.createContext({
  isLogin: false,
  setIsLogin: () => {},
});

function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (isLogin) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    HttpService.post("/user/login", { token }).then((res) => {
      const { status } = res.data;
      if (status === 200) {
        setIsLogin(true);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
