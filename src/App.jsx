import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// COMPONENTS
import GlobalToaster from "./components/GlobalToaster";
import Login from "./login/Login";
import PageNotFound from "./NotFound/PageNotFound";
import LoadingBar from "./utils/LoadingBar";
import JsonToolsPage from "./Tools/Json/JsonToolsPage";
import { PathName } from "./lib/pathName";
import ChatWidget from "./ChatWidget/ChatWidget";

// ROUTES
import Approutes from "./routes/Approutes/Approutes";
import PrivateRoute from "./routes/Auth/PrivateRoute";
import AuthRoute from "./routes/Auth/AuthRoute";
import { PermissionRoute } from "./routes/Auth/PermissionRoute";
import Apiroutes from "./routes/Apiroutes/Apiroutes";



const App = () => {
  return (
    <Router>
      <PathName />
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
        <Route
          path="/chatwidget"
          element={
            <ChatWidget />
          }
        />



        <Route element={<PrivateRoute />}>
          {/* <Route element={<PermissionRoute />}> */}
          <Route path="/*" element={<Approutes />} />
          <Route path="/docs/*" element={<Apiroutes />} />
          {/* </Route> */}
        </Route>

        <Route path="*" element={<PageNotFound />} />
        {/* <Route path="jsontoolpage" element={<JsonToolsPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
