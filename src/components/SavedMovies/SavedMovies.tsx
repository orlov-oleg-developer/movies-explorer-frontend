import './SavedMovies.css'
import React, {FC, useEffect, useState} from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import Preloader from "../Preloader/Preloader";
import useSearch from "../../hooks/useSearch";

interface SavedMoviesProps {
  isLoggedIn: boolean,
  totalCount: number,
}

const SavedMovies: FC<SavedMoviesProps> = ({ isLoggedIn, totalCount }) => {
  const { savedMovies, error, loading } = useTypedSelector(state => state.savedMovies);
  const [ savedMoviesSearchQuery, setSavedMoviesSearchQuery ] = useState('');
  const [ savedMoviesToggleState, setSavedMoviesToggleState ] = useState(false);
  const searchedSavedMovies = useSearch(savedMovies, savedMoviesSearchQuery, savedMoviesToggleState);

  const handleMoviesSearchCb = (searchQuery: string, toggleState: boolean) => {
    if (searchQuery) {
      setSavedMoviesSearchQuery(searchQuery)
    };
    if (toggleState !== null) {
      setSavedMoviesToggleState(toggleState)
    };
  }

  return (
    <main className="saved-movies">
      <SearchForm
        path={'/saved-movies'}
        handleMoviesSearch={handleMoviesSearchCb}
      />
      {savedMovies.length !== 0 &&
        <MoviesCardList
          path={'/saved-movies'}
          movies={searchedSavedMovies}
          cardPlace={"saved-movie"}
          moviesCount={totalCount}
        />
      }
      {savedMovies.length === 0 && <p className="saved-movies__message">Сохраненных фильмов не найдено</p>}
      {/*{errorMessage &&*/}
      {/*  <p className="saved-movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.*/}
      {/*    Подождите немного и попробуйте ещё раз</p>*/}
      {/*}*/}
      {!isLoggedIn && <Preloader />}
    </main>
  );
};

export default SavedMovies;
