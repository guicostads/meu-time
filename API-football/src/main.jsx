import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./routes/Login.jsx";
import Countries from "./routes/Countries.jsx";
import Leagues from "./routes/Leagues.jsx";
import Teams from "./routes/Teams.jsx";
import TeamData from "./routes/TeamData.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/countries", element: <Countries /> },
      { path: "/leagues", element: <Leagues /> },
      { path: "/teams", element: <Teams /> },
      {path: '/teamData', element: <TeamData />}
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
