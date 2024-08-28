import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.tsx";
import "@/styles/index.css";
import { apiConfig } from "./services/api.config";
import ToastProvider from "./providers/toast-provider";
import QueryProvider from "./providers/query-provider";
import { Toaster } from "@/components/ui/sonner";

apiConfig();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryProvider>
        <BrowserRouter>
          <Toaster />
          <ToastProvider />
          <App />
        </BrowserRouter>
      </QueryProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
