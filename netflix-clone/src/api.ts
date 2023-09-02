import axios from "axios";

const BASE_PATH = "https://api.themoviedb.org/3/";
const ACCESS_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODdlNzI4MjAxOWNkMTIzYWJjZGY1ZTE1ZWE1Y2ZmOCIsInN1YiI6IjY0ZjJiZWM4OTdhNGU2MDEzODk2YzFjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pUzjm5DkZAys4MN88-J9j4lpSrTIkqbWCu1nCFmOpvA";

export interface Dates {
  maximum: Date;
  minimum: Date;
}
export interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export enum OriginalLanguage {
  En = "en",
  Fr = "fr",
  Ja = "ja",
}
export interface IGetMoviesResult {
  dates: Dates;
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}
export const getMovies = async () => {
  const { data } = await axios.get(
    BASE_PATH + `movie/now_playing?language=en-US&page=1`,
    {
      headers: {
        accept: "application/json",
        Authorization: ACCESS_TOKEN,
      },
    }
  );
  return data;
};
