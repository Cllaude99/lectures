import { createBrowserRouter } from "react-router-dom";
import Tv from "../Screens/Tv";
import Search from "../Screens/Search";
import App from "../App";
import Home from "../Screens/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "tv",
        element: <Tv />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
]);

export default router;
