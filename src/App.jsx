import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Approutes from "./routes/Approutes/Approutes";
import GlobalToaster from "./components/GlobalToaster";
import Apiroutes from "./routes/Apiroutes/Apiroutes";
import Login from "./login/Login";
import PrivateRoute from "./routes/Auth/PrivateRoute";
import AuthRoute from "./routes/Auth/AuthRoute";
import PageNotFound from "./NotFound/PageNotFound";
import LoadingBar from "./utils/LoadingBar";
import BeforeUnloadWarning from "./utils/BeforeUnloadWarning";
import { PermissionRoute } from "./routes/Auth/PermissionRoute";
import { PathName } from "./lib/pathName";

const App = () => {
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
