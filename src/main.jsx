import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from 'react-hot-toast'; // Import Toaster bukan ToastProvider
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster position="top-right" /> 
    <App />
  </React.StrictMode>
);
