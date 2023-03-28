import './MoviesCard.css'
import React, { FC, useState } from 'react';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { IMovie } from "../../types/movies";
import { ISavedMovie } from "../../types/savedMovies";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import toTime from "../../utils/toTime";
import checkIconPath from "../../images/check-icon.svg";
import deleteButtonPath from "../../images/delete-button.svg";

interface MoviesCardProps {
  movie: IMovie;
  place: string
}

const MoviesCard: FC<MoviesCardProps> = ({ movie, place }) => {
  const { addSavedMovies, deleteSavedMovies } = useActions()
  const { token } = useTypedSelector(state => state.token);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  const handleConfirm = (): void => {
    setIsOpen(false);
  }

  const handleClosePopup = () => {
    setIsOpen(false);
  }

  function handleMovieLike(movie: ISavedMovie) {
    if (!token) {
      setIsOpen(true);
      return;
    }
    addSavedMovies(movie, token);
  }

  function handleDeleteMovie(movieID: string) {
    deleteSavedMovies(movieID, token);
  }

  const openInNewTab = (url: any) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <ConfirmationPopup
        onConfirm={handleConfirm}
        onCloseButton={handleClosePopup}
        isOpen={isOpen}
        message={'Необходима авторизация'}
      />
      <li
        className="movies-card">
        <div className="movies-card__text-container">
          <p className="movies-card__title">{nameRU}</p>
          <p className="movies-card__duration">{toTime(duration)}</p>
        </div>
        <div
          onClick={() => openInNewTab(trailerLink)}
          className="movies-card__image"
          style={{ backgroundImage: image.url ? `url(https://api.nomoreparties.co/${image.url})` : `url(${image})` }}
        />
        {place === "movie"
          ?
          (owner
            ?
            <button
              onClick={() => { if (movie._id) handleDeleteMovie(movie._id) }}
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
            onClick={() => { if (movie._id) handleDeleteMovie(movie._id) }}
            className="movies-card__button"
            style={{ backgroundImage: `url(${deleteButtonPath})` }}
          />
        }
      </li>
    </>
  );
};

export default MoviesCard;
