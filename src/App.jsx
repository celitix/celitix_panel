import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ROUTES 
import Approutes from "./routes/Approutes/Approutes";
import Apiroutes from "./routes/Apiroutes/Apiroutes";
import PrivateRoute from "./routes/Auth/PrivateRoute";
import AuthRoute from "./routes/Auth/AuthRoute";
import SalesPersonRoutes from "./routes/SalesPersonRoutes/SalesPersonRoutes";
import AccountRoutes from "./routes/AccountRoutes/AccountRoutes";


// COMPONENTS
import GlobalToaster from "./components/GlobalToaster";
import Login from "./login/Login";
import PageNotFound from "./NotFound/PageNotFound";
import LoadingBar from "./utils/LoadingBar";
import BeforeUnloadWarning from "./utils/BeforeUnloadWarning";
import { PermissionRoute } from "./routes/Auth/PermissionRoute";
import { PathName } from "./lib/pathName";
import UnknownDashboard from "./dashboard/UnknownDashboard";

// User
import { useUser } from "@/context/auth";
import SalesPersonDashboard from "./dashboard/SalesPersonDashboard";
import AccountsDahboard from "./dashboard/AccountsDashboard";


const App = () => {
  const { user } = useUser();
  return (
    <Router>
      <PathName />
      {/* Site Warning when leave or reload */}
      {/* <BeforeUnloadWarning /> */}

      {/* Toaster */}
      <GlobalToaster />

      {/* Loading Top Progress Bar */}
      <LoadingBar />

      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />

        <Route element={<PrivateRoute />}>
          <Route path="/docs/*" element={<Apiroutes />} />

          {user?.role === "SALESPERSON" && (
            <>
              <Route path="/" element={<Navigate to="/sales" replace />} />
              <Route path="/sales/*" element={<SalesPersonRoutes />} />
            </>
          )}

          {user?.role === "ACCOUNTUSER" && (
            <>
              <Route path="/" element={<Navigate to="/accounts" replace />} />
              <Route path="/accounts/*" element={<AccountRoutes />} />
            </>
          )}

          {/* {user?.role !== "SALESPERSON" &&
            user?.role !== "ACCOUNTUSER" &&
            user?.role !== "DIRECTUSER" &&
            user?.role !== "AGENT" && (
              <Route path="*" element={<UnknownDashboard />} />
            )} */}

          <Route element={<PermissionRoute />}>
            <Route path="/*" element={<Approutes />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
