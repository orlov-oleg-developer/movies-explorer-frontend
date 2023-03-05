import './MoviesCard.css'
import checkIconPath from "../../images/check-icon.svg";
import deleteButtonPath from "../../images/delete-button.svg";

import toTime from "../../utils/toTime";

const MoviesCard = ({ movie, place, onMovieLike, onDeleteMovie }) => {
  const {
    id,
    country,
    director,
    duration,
    created_at,
    description,
    image,
    nameRU,
    nameEN,
    trailerLink,
    owner
  } = movie;

  function handleMovieLike(movie) {
    onMovieLike(movie);
  }

  function handleDeleteMovie(movieID) {
    onDeleteMovie(movieID);
  }

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <li
      className="movies-card">
      <div className="movies-card__text-container">
        <p className="movies-card__title">{nameRU}</p>
        <p className="movies-card__duration">{toTime(duration)}</p>
      </div>
      <div
        onClick={() => openInNewTab(trailerLink)}
        className="movies-card__image"
        style={{ backgroundImage: image.url ? `url(https://api.nomoreparties.co/${image.url})` : `url(${image})`}}
      />
      {place === "movie"
      ?
        (owner
          ?
          <button
            onClick={() => handleDeleteMovie(movie._id)}
            className="movies-card__button movies-card__button_type_check"
            style={{ backgroundImage: `url(${checkIconPath})` }}
          />
          :
          <button
            onClick={() => handleMovieLike({
              country: country,
              director: director,
              duration: duration,
              year: created_at,
              description: description,
              image: `https://api.nomoreparties.co/${image.url}`,
              trailerLink: movie.trailerLink,
              thumbnail: `https://api.nomoreparties.co/${image.formats.thumbnail.url}`,
              movieId: String(id),
              nameRU: nameRU,
              nameEN: nameEN
            })}
            className="movies-card__text"
          >Сохранить</button>
        )
      :
        <button
          onClick={() => handleDeleteMovie(movie._id)}
          className="movies-card__button"
          style={{ backgroundImage: `url(${deleteButtonPath})` }}
        />
      }
    </li>
  );
};

export default MoviesCard;
