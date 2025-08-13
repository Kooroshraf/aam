import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Team from "./pages/Team.jsx";

// (Done By Reza Ahmari (Ph.D.) (Rahmari@aggies.ncat.edu) (Kooroshraf@gmail.com) (+13364935421))
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/team", element: <Team /> },
],
 { basename: "/aam-site" }
);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
