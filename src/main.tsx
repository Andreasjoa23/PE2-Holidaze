import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import "./index.css";

/**
 * Entry point of the React application.
 * - Wraps the app in React Strict Mode for highlighting potential issues.
 * - Uses `BrowserRouter` for client-side routing.
 * - Includes `ParallaxProvider` for scroll-based parallax effects.
 * - Applies global styles via Tailwind (imported from index.css).
 */


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ParallaxProvider>
        <App />
      </ParallaxProvider>
    </BrowserRouter>
  </React.StrictMode>
);
