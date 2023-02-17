import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({ path, movies, cardPlace, moviesCount, addMoviesCount, handleLikeMovieCb, handleMovieDeleteCb }) => {
  let list = [];

  let key = new Date();
  const generateKey = () => {
    key += new Date();
    return key;
  }

  if (path === '/movies') {
    for (let i = 0; i < moviesCount && i < movies.length; i++) {
      list.push(
        <MoviesCard
          key={generateKey()}
          movie={movies[i]}
          place={cardPlace}
          onMovieLike={handleLikeMovieCb}
          onDeleteMovie={handleMovieDeleteCb}
        />
      );
    }
  } else {
    movies.map((movie) => {
      list.push(
        <MoviesCard
          key={generateKey()}
          movie={movie}
          place={cardPlace}
          onMovieLike={handleLikeMovieCb}
          onDeleteMovie={handleMovieDeleteCb}
        />
      );
    })
  }

  return (
    <section className="movies-card-list__section">
      <ul className="movies-card-list">
        {list}
      </ul>
      {(movies.length > moviesCount && path === '/movies') &&
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
