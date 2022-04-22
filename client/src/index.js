import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import { CookiesProvider } from "react-cookie";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);
