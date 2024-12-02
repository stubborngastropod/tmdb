import { useState, useEffect } from "react";

const Ranking = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDZlNzJmYjkwNGExMTkyOGUzM2JjZmJlNmViNTU5YSIsIm5iZiI6MTY3NDc3OTQ5OS40MTQsInN1YiI6IjYzZDMxYjZiMDMxYTFkMDBjMDk1NGRiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fcum_1eJr7IJUKl_aAcsrE9JAe3efw37D3oDiOrLwPQ",
    },
  };

  useEffect(() => {
    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error("데이터를 가져오는 데 실패했습니다.");
        }
        return res.json();
      })
      .then((json) => {
        setMovies(json.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div>
      <h1>영화 랭킹</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <p>평점: {movie.vote_average}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;
