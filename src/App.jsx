/* eslint-disable no-unused-vars */
import React from "react";
import { useRoutes } from "react-router-dom";

import Home from "./pages/home/Home";

const App = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
  ]);
  return <>{routes}</>;
};

export default App;
