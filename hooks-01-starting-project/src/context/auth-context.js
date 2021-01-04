import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  login: () => { }
});

const AuthContextProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginHandler = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ login: loginHandler, isAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthContextProvider;