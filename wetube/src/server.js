import express from "express";
import morgan from "morgan";
import session from "express-session";
import routeRouter from "./routers/routeRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
  }),
);

<<<<<<< HEAD
=======
app.use(localsMiddleware);

>>>>>>> 01a65b890b0283f3afcd7c64c2035637e7ba9db2
app.use("/", routeRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
