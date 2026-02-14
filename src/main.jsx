import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App.jsx";
import "./index.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import ErrorBoundary from "./utils/ErrorBoundary.jsx";
import { UserProvider } from "./context/auth";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DownloadProvider } from "./context/DownloadProvider.jsx";
import { Provider } from "react-redux";
import store from "./whatsapp/whatsappFlows/redux/Store.js";
import NetworkStatusProvider from "./context/NetworkStatusProvider.jsx";
import { WabaAgentProvider } from "./context/WabaAndAgent.jsx";
import { InstagramProvider } from "./context/InstagramContext.jsx";
import { MessangerProvider } from "./context/MessengerContext.jsx";
import { RcsProvider } from "./context/RcsContext.jsx";
import { ThemeProvider } from "./ApiDocs/context/ThemeContext.jsx";
import { SettingsProvider } from "./context/LiveChatSettingContext.jsx";
import { queryClient } from "./lib/reactQueryClient";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <QueryClientProvider client={queryClient}> */}
      <UserProvider>
        <PrimeReactProvider>
          {/* <ErrorBoundary> */}
          <DownloadProvider>
            <WabaAgentProvider>
              <InstagramProvider>
                <RcsProvider>
                  <MessangerProvider>
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
                  </MessangerProvider>
                </RcsProvider>
              </InstagramProvider>
            </WabaAgentProvider>
          </DownloadProvider>
          {/* </ErrorBoundary> */}
        </PrimeReactProvider>
      </UserProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    {/* </QueryClientProvider> */}
  </StrictMode>
);
