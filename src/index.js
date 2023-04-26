import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// react-query
import { QueryClientProvider, QueryClient } from "react-query";
// context providers
import { NotificationContextProvider } from "./NotificationContext";
import { CredentialsContextProvider } from "./CredentialsContext";
import { UsersContextProvider } from "./UsersContext";
// react-query
const queryClient = new QueryClient();
// router
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <CredentialsContextProvider>
        <UsersContextProvider>
          <Router>
            <App />
          </Router>
        </UsersContextProvider>
      </CredentialsContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
);
