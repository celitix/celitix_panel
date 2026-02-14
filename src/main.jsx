import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import App from "./App.jsx";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import store from "./whatsapp/whatsappFlows/redux/Store.js";

import { ThemeProvider } from "./ApiDocs/context/ThemeContext";

// import store from "./whatsapp/whatsappFlows/redux/Store.js";
import { UserProvider } from "./context/auth";
import { DownloadProvider } from "./context/DownloadProvider.jsx";
import NetworkStatusProvider from "./context/NetworkStatusProvider.jsx";
import { WabaAgentProvider } from "./context/WabaAndAgent.jsx";
import { InstagramProvider } from "./context/InstagramContext.jsx";
import { MessangerProvider } from "./context/MessengerContext.jsx";
import { RcsProvider } from "./context/RcsContext.jsx";
import { UserAndAdminProvider } from "./context/UserAndAdminContext";
import { SettingsProvider } from "./context/LiveChatSettingContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <PrimeReactProvider>
        {/* <ErrorBoundary> */}
        <DownloadProvider>
          <WabaAgentProvider>
            <InstagramProvider>
              <RcsProvider>
                <MessangerProvider>
                  <UserAndAdminProvider>
                    <ThemeProvider>
                      <SettingsProvider>
                        <DndProvider backend={HTML5Backend}>
                          <Provider store={store}>
                            {/* <NetworkStatusProvider></NetworkStatusProvider> */}
                            <App />
                          </Provider>
                        </DndProvider>
                      </SettingsProvider>
                    </ThemeProvider>
                  </UserAndAdminProvider>
                </MessangerProvider>
              </RcsProvider>
            </InstagramProvider>
          </WabaAgentProvider>
        </DownloadProvider>
        {/* </ErrorBoundary> */}
      </PrimeReactProvider>
    </UserProvider>
  </StrictMode>
);
