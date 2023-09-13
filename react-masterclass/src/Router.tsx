import { createBrowserRouter } from "react-router-dom";
import { Home, About } from "./screens";
import { Header } from "./components/Header";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);
