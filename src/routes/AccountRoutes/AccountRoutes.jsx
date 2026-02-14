import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

// COMPONENTS
import AccountsDashboard from '@/dashboard/AccountsDashboard';

import MainlayoutOther from '@/mainlayoutOther/MainlayoutOther';

import Transactions from "@/managefunds/transactions/Transactions";

import ProfilePage from "@/profile/pages/Profile";

import LoginIpDetails from "@/profile/pages/LoginIpDetails";
import ManageUser from '@/ManageUser/ManageUser';

const AccountRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainlayoutOther />}>
        <Route index element={<AccountsDashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="loginIpdetails" element={<LoginIpDetails />} />
        <Route path="manageuser" element={<ManageUser />} />
      </Route>
    </Routes>
  )
}

export default AccountRoutes