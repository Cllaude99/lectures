import axios from "axios";

const BASE_PATH = "https://api.themoviedb.org/3/";
const ACCESS_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODdlNzI4MjAxOWNkMTIzYWJjZGY1ZTE1ZWE1Y2ZmOCIsInN1YiI6IjY0ZjJiZWM4OTdhNGU2MDEzODk2YzFjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pUzjm5DkZAys4MN88-J9j4lpSrTIkqbWCu1nCFmOpvA";

export const getMovies = async () => {
  const { data } = await axios.get(
    BASE_PATH + "movie/now_playing?language=en-US&page=1",
    {
      headers: {
        accept: "application/json",
        Authorization: ACCESS_TOKEN,
      },
    }
  );
  return data;
};
