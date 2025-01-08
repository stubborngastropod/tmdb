import { useState, useEffect } from "react";
import Ranking from "../components/Ranking";
import Recommender from "../components/Recommender";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const userPref = {
    genre: [1, 3, 5, 7, 9],
    popularity: [1, 2],
    release_date: [1970, 1980, 2000],
  };

  const onAdd = (e) => {
    const movieId = e.target.alt;
    const movie = movies.find((movie) => String(movie.id) === String(movieId));
    if (
      movie &&
      !candidates.some((candidate) => String(candidate.id) === String(movieId))
    ) {
      setCandidates([
        {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
        },
        ...candidates,
      ]);
    }
  };

  const onDelete = (e) => {
    const movieId = e.target.alt;
    console.log(e.target.alt);
    setCandidates(
      candidates.filter((candidate) => String(candidate.id) !== String(movieId))
    );
  };

  const onRefresh = () => {
    setCandidates([]);
  };

  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
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
        console.log(json);
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
      <h1>영화랜드</h1>
      <Recommender
        candidates={candidates}
        onDelete={onDelete}
        onRefresh={onRefresh}
      />
      <Ranking
        onAdd={onAdd}
        movies={movies}
        filterby="genre_ids"
        userPref={userPref}
      />
      <Ranking
        onAdd={onAdd}
        movies={movies}
        filterby="popularity"
        userPref={userPref}
      />
      <Ranking
        onAdd={onAdd}
        movies={movies}
        filterby="release_date"
        userPref={userPref}
      />
    </div>
  );
};

export default Home;
