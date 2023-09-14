import { createBrowserRouter } from "react-router-dom";
import NotFound from "./screens/NotFound";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Coins />,
  },
  {
    path: "/:coinId",
    element: <Coin />,
  },
]);
