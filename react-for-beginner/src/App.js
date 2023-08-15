import { Routes, Route } from "react-router-dom";
import { Home, Detail } from "./routes";

const App = () => {
  return (
    <Routes>
      <Route path={process.env.PUBLIC_URL + "/"} element={<Home />} />
      <Route path="/movie/:id" element={<Detail />} />
    </Routes>
  );
};

export default App;
