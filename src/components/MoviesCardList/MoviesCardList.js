import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({movies, cardPlace, moviesCount, addMoviesCount}) => {
  const list = [];

  for (let i = 0; i < moviesCount && i < movies.length; i++) {
    list.push(<MoviesCard key={i} movie={movies[i]} place={cardPlace}/>)
  }

  return (
    <section className="movies-card-list__section">
      <ul className="movies-card-list">
        {list}
      </ul>
      {(movies.length > moviesCount) &&
        <div className="movies-card-list__button-container">
          <button
            className="movies-card-list__button"
            onClick={addMoviesCount}
          >
            Ещё
          </button>
        </div>
      }
    </section>
  );
};

export default MoviesCardList;
