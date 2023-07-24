import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
const PORT = 4000;

const app = express();

const logger = morgan("dev");

app.set("views", process.cwd() + "/src/views"); // views를 찾는 경로를 바꿔주기 위한 용도 (res.render함수에서 첫 번째 인수 값의 pug파일을 찾을때 views폴더를 찾는데 이때 경로를 재설정해줌)
app.set("view engine", "pug"); // view engine이 pug파일임을 알려주기 위한 용도 (pug파일로 html화면을 보이겠다는 의미)
app.use(logger);
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

app.listen(PORT, () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`)
);
