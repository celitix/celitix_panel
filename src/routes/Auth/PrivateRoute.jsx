// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const PrivateRoute = () => {
//   const token = sessionStorage.getItem("token");

//   return token ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;


import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserDataProvider } from "@/context/UserContext";

const PrivateRoute = () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <UserDataProvider>
      <Outlet />
    </UserDataProvider>
  );
};

export default PrivateRoute;

