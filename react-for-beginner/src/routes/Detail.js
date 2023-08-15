import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

export const Detail = () => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  return (
    <div>
      {loading ? (
        <h1>Loading Please Wait</h1>
      ) : (
        <div>
          <img src={movie.background_image} alt="backgroundImg" />
          <div>
            <h3>{movie.title}</h3>
            <p>Rating : {movie.rating}</p>
          </div>
          <p>{movie.description_full}</p>
          <ul>
            {movie.genres.map((g) => (
              <li>{g}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Detail;
