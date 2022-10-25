import React, { createContext } from "react";
import { useState } from "react";

export const account = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <account.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </account.Provider>
  );
};

export default UserContext;
