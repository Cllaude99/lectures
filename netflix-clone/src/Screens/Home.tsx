import { useQuery } from "react-query";
import { getMovies } from "../api";

const Home = () => {
  const {} = useQuery([], getMovies);
  return <div style={{ backgroundColor: "whitesmoke", height: "200vh" }}></div>;
};

export default Home;
