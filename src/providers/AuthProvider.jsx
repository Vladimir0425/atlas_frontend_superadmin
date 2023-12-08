import React, { useState } from "react";

const AuthContext = React.createContext({
  isLogin: false,
  setIsLogin: () => {},
});

function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
