import './MoviesCardList.css'
import React, {FC} from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";

interface MoviesCardListProps {
  path: string;
  movies: any[];
  cardPlace: string;
  moviesCount: number
}

const MoviesCardList: FC<MoviesCardListProps> = ({ path, movies, cardPlace, moviesCount }) => {
  let list = [];

  let key = String(new Date());
  const generateKey = () => {
    key += String(new Date());
    return key;
  }

  if (path === '/movies') {
    for (let i = 0; i < moviesCount && i < movies.length; i++) {
      list.push(
        <MoviesCard
          key={generateKey()}
          movie={movies[i]}
          place={cardPlace}
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
            // onClick={addMoviesCount}
          >
            Ещё
          </button>
        </div>
      }
    </section>
  );
};

export default MoviesCardList;
