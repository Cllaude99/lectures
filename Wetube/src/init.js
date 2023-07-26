import "./db"; // mongodb와의 연결의 위한 부분
import "./models/Video"; // Video라는 모델을 알 수 있도록 하기 위한 코드
import app from "./server";

const PORT = 4000;

app.listen(PORT, () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`)
);
