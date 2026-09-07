import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/common/ScrollToTop";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <ScrollToTop />
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />

        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
