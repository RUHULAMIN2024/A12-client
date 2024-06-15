import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import "./index.css";
import router from "./router/Router";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <ToastContainer
            position="top-center"
            autoClose={1200}
            className={"z-[99999]"}
          ></ToastContainer>
          <RouterProvider router={router} />
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
