import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, _] = useSearchParams();
  const keyword = searchParams.get("keyword");
  return null;
};

export default Search;
