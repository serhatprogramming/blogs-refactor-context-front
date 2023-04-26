import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// react-query
import { QueryClientProvider, QueryClient } from "react-query";

// context provider
import { NotificationContextProvider } from "./NotificationContext";

// react-query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </QueryClientProvider>
);
