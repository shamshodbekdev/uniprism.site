/** Entry point for the UniPrism landing page. */

import React from "react";
import ReactDOM from "react-dom/client";

import Landing from "./Landing";
import "./landing.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element #root not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Landing />
  </React.StrictMode>,
);
