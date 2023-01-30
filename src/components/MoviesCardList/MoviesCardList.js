import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({movies, cardPlace}) => {
  return (
    <section className="movies-card-list__section">
      <ul className="movies-card-list">
        {movies.map((movie) => {
          return <MoviesCard movie={movie} place={cardPlace}/>
        })}
      </ul>
      <div className="movies-card-list__button-container">
        <button className="movies-card-list__button">
          Ещё
        </button>
      </div>
    </section>
  );
};

export default MoviesCardList;
