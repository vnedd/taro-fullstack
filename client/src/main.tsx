import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.tsx";
import "@/styles/index.css";
import { apiConfig } from "./services/api.config";
import ToastProvider from "./providers/toast-provider.tsx";

apiConfig();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <ToastProvider />
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
