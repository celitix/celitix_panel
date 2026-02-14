import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";


// COMPONENTS
import SalesPersonDashboard from "@/dashboard/SalesPersonDashboard";

import MainlayoutOther from "@/mainLayoutOther/MainLayoutOther";

import Transactions from "@/managefunds/transactions/Transactions";

import ProfilePage from "@/profile/pages/Profile";

import LoginIpDetails from "@/profile/pages/LoginIpDetails";
import ManageUser from "@/ManageUser/ManageUser";

const SalesPersonRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainlayoutOther />}>
        <Route index element={<SalesPersonDashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="loginIpdetails" element={<LoginIpDetails />} />

        <Route path="manageuser" element={<ManageUser />} />

      </Route>
    </Routes>
  );
};

export default SalesPersonRoutes;
