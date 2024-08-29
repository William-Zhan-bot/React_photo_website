import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// routes設定在這裡
import { BrowserRouter } from "react-router-dom";

// BrowserRouter => 包住tag 指定Router
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
