import "./Ranking.css";

const Ranking = ({ onAdd, movies, filterby, userPref }) => {
  const filterMovie = (movies, filterby) => {
    let movieList = [];
    switch (filterby) {
      case "genre_ids":
        movieList = movies.filter((movie) => {
          return userPref.genre.includes(movie.genre_ids[0]);
        });
        break;
      case "popularity":
        movieList = movies.filter((movie) => {
          return userPref.popularity.includes(
            Math.floor(Number(movie.popularity) / 50)
          );
        });
        break;
      case "release_date":
        movieList = movies.filter((movie) => {
          const releaseYear =
            Math.floor(new Date(movie.release_date).getFullYear() / 10) * 10;
          return userPref.release_date.includes(releaseYear);
        });
        break;
      default:
        break;
    }
    console.log(movieList);
    return movieList;
  };

  return (
    <div className="Ranking">
      <h2>영화 랭킹</h2>
      <ul>
        {filterMovie(movies, filterby).map((movie) => (
          <li key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.id}
              onClick={onAdd}
            />
            <h2>{movie.title}</h2>
            <p>평점: {movie.vote_average}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;
