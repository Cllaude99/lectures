import express from "express";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userControllers";
import { home, search } from "../controllers/videoController";

const routeRouter = express.Router();

routeRouter.get("/", home);
routeRouter.route("/join").get(getJoin).post(postJoin);
routeRouter.route("/login").get(getLogin).post(postLogin);
routeRouter.get("/search", search);
export default routeRouter;
