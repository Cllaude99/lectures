import { createBrowserRouter } from "react-router-dom";
import NotFound from "./screens/NotFound";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";
import Chart from "./routes/Chart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Coins />,
  },
  {
    path: "/:coinId",
    element: <Coin />,
    children: [
      {
        path: "price",
        element: <Price />,
      },
      {
        path: "chart",
        element: <Chart />,
      },
    ],
  },
]);
