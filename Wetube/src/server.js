import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo"; // 세션을 DB에 저장하기 위한 용도
import globalRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

const app = express();

const logger = morgan("dev");

app.set("views", process.cwd() + "/src/views"); // views를 찾는 경로를 바꿔주기 위한 용도 (res.render함수에서 첫 번째 인수 값의 pug파일을 찾을때 views폴더를 찾는데 이때 경로를 재설정해줌)
app.set("view engine", "pug"); // view engine이 pug파일임을 알려주기 위한 용도 (pug파일로 html화면을 보이겠다는 의미)
app.use(logger);
app.use(express.json()); // req.body값을 받을 수 있도록 다음과 같은 설정이 필요하다.
app.use(express.urlencoded({ extended: true })); //form의 value 값을 자바스크립트 object값으로 불러오기 위해 다음과 같은 설정이 필요하다.

app.use(
  session({
    // 세션 미들웨어를 통해 어떤 브라우저가 들어오는 지 확인할 수 있다.
    // 세션 미들웨어가 브라우저한테 텍스트를 보낸다. (서버가 해당 브라우저의 접근을 기억하기 위함)
    // 서버가 브라우저한테 세션ID를 보내주는 과정.
    secret: process.env.COOKIE_SECRET, // 쿠키에 sign할때 사용하는 string (우리 backend가 쿠키를 줬다는 것을 보여주기 위함)
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }), // 세션을 DB에 저장하기 위한 용도 (sessions라는 컬렉션이 해당 DB에 만들어 지고 여기에 세션이 저장되는 것임)
  })
);
app.use(localsMiddleware); // 해당 코드는 app.use(sesseion({...})) 코드 아래에 있어야한다.
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
