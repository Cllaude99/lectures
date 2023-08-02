import mongoose from "mongoose";
// mongodb 에서 자동으로 database를 만들어 주는 방법은 아래와 같이 mongodb경로 뒤에 /(database이름) 의 형태로 경로를 넣어주면 된다.
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = error => console.log("❌ DB Error", error);

db.on("error", handleError); // DB와의 연결에 실패한 경우 계속해서 체크한다 (on)
db.once("open", handleOpen); // DB와의 연결에 성공한 경우 한번만 체크한다 (once)
