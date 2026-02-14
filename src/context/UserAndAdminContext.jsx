import { createContext, useContext, useState } from "react";

const UserAndAdminContext = createContext();

export const UserAndAdminProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState("Admin");


  return (
    <UserAndAdminContext.Provider
      value={{
        currentRole,
        setCurrentRole
      }}
    >
      {children}
    </UserAndAdminContext.Provider>
  );
};

export const useUserAndAdminContext = () => useContext(UserAndAdminContext);
