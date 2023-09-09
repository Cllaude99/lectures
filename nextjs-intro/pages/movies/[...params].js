import { useRouter } from "next/router";

export async function fetchMovie(movieId) {
  const data = await (await fetch(`/api/movies/${movieId}`)).json();
  return data;
}

export default function Detail() {
  const router = useRouter();
  const [title, id] = router.query.params || [];
  return (
    <div>
      <h4>{title || "Loading..."}</h4>
    </div>
  );
}
