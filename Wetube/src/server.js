import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

app.use(logger);
app
  .get("/", (req, res) => {
    res.json({ name: "kim" });
  })
  .get("/login", (req, res) => {
    res.send("Login here");
  });

app.listen(PORT, () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`)
);
