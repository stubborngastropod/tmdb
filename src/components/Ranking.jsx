import "./Ranking.css";

const Ranking = ({ onAdd, movies }) => {
  return (
    <div className="Ranking">
      <h2>영화 랭킹</h2>
      <ul>
        {movies.map((movie) => (
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
