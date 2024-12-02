import "./Recommender.css";

const Recommender = ({ candidates, onDelete, onRefresh }) => {
  const pickMovie = () => {
    if (candidates.length < 2) {
      alert("영화를 두 개 이상 선택해주세요");
      return;
    }

    const randomIndex = Math.floor(Math.random() * candidates.length);
    alert(candidates[randomIndex].title);
  };

  if (candidates.length < 1) {
    return <div>아래 목록에서 영화를 터치하여 추가하세요</div>;
  }

  return (
    <div className="Recommender">
      <h2>후보</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${candidate.poster_path}`}
              alt={candidate.id}
              onClick={onDelete}
            />
            <h2>{candidate.title}</h2>
            <p>평점: {candidate.vote_average}</p>
          </li>
        ))}
      </ul>
      <button onClick={pickMovie}>영화뽑기</button>
      <button onClick={onRefresh}>목록 초기화</button>
    </div>
  );
};

export default Recommender;
