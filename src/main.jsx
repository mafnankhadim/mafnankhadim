import React from "react";
import ReactDOM from "react-dom/client";
// base.css MUST be imported before App: Vite emits CSS in module-graph order,
// so importing App first would pull in every component stylesheet ahead of the
// design system, and base.css would then override the components meant to
// refine it (a `.nav-cta { display: none }` losing to `.btn { display: flex }`,
// for example). Design system first, component sheets after.
import "./styles/base.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
