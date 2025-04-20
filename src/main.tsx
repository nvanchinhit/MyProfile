import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find root element");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
