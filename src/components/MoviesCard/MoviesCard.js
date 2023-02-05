import './MoviesCard.css'
import checkIconPath from "../../images/check-icon.svg";
import deleteButtonPath from "../../images/delete-button.svg"

const MoviesCard = ({movie, place}) => {
  const {
    duration,
    image,
    nameRU,
    trailerLink,
    owner
  } = movie;

  return (
    <li className="movies-card">
      <div className="movies-card__text-container">
        <p className="movies-card__title">{nameRU}</p>
        <p className="movies-card__duration">{duration}</p>
      </div>
      <div
        className="movies-card__image"
        style={{ backgroundImage: `url(https://api.nomoreparties.co/${image.url})` }}
      />
      {place === "movie"
      ?
        (owner
          ?
          <button
            className="movies-card__button movies-card__button_type_check"
            style={{ backgroundImage: `url(${checkIconPath})` }}
          />
          :
          <button className="movies-card__text">Сохранить</button>
        )
      :
        <button
          className="movies-card__button"
          style={{ backgroundImage: `url(${deleteButtonPath})` }}
        />
      }
    </li>
  );
};

export default MoviesCard;
