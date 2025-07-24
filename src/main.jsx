import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import.meta.glob("./styles/*.css", { eager: true });
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
