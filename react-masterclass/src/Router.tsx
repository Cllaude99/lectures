import { createBrowserRouter, Routes, Route } from "react-router-dom";
import Root from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);
export default router;
