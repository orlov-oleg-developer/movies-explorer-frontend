import './Movies.css'
import React, { FC, useEffect, useState } from 'react';
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import useSearch from "../../hooks/useSearch";
import Preloader from "../Preloader/Preloader";
import { SCREEN, TABLET } from '../../config/config'

interface MoviesProps {
  isLoggedIn: boolean;
}

const Movies: FC<MoviesProps> = ({ isLoggedIn }) => {
  const { movies, error, loading } = useTypedSelector(state => state.movies);
  const { savedMovies } = useTypedSelector(state => state.savedMovies);

  const { getMovies, setMovies, addCardsTotalCount } = useActions();

  const [isFirstRequest, setIsFirstRequest] = useState(false);
  const [moviesSearchQuery, setMoviesSearchQuery] = useState('');
  const [moviesToggleState, setMoviesToggleState] = useState(false);
  const searchedMovies = useSearch(movies, moviesSearchQuery, moviesToggleState);
  const [searchedMoviesWithOwner, setSearchedMoviesWithOwner] = useState<any[]>([]);

  const handleMoviesSearchCb = (searchQuery: string, toggleState: boolean) => {
    if (isFirstRequest) {
      getMovies();
      localStorage.setItem('isFirstRequest', JSON.stringify(isFirstRequest));
      setIsFirstRequest(false);
    }

    if (searchQuery) {
      setMoviesSearchQuery(searchQuery)
    };
    if (toggleState !== null) {
      setMoviesToggleState(toggleState)
    };
  }

  const handleAddMoviesCount = () => {
    if (window.innerWidth >= SCREEN) {
      addCardsTotalCount(3);
    }
    else if (window.innerWidth >= TABLET) {
      addCardsTotalCount(2);
    }
    else {
      addCardsTotalCount(2);
    }
  }

  const addOwnerStatusToMovie = (moviesList: any[], savedMovies: any[]): any[] => {
    return moviesList.map((movie) => {
      let ownerStatus = false;

      for (let savedMovieIndex = 0; savedMovieIndex < savedMovies.length; savedMovieIndex++) {
        if (String(savedMovies[savedMovieIndex].movieId) === String(movie.id)) {
          ownerStatus = true;
          movie._id = savedMovies[savedMovieIndex]._id;
          break;
        }
      }
      return (ownerStatus ? { ...movie, owner: true } : { ...movie, owner: false });
    })
  }

  useEffect(() => {
    const isFirstRequestState = localStorage.getItem('isFirstRequest');
    if (isFirstRequestState !== null) {
      setIsFirstRequest(false)
    } else {
      setIsFirstRequest(true);
      return;
    }

    const moviesList = localStorage.getItem('movies');
    if (moviesList !== null) {
      setMovies(JSON.parse(moviesList));
    } else getMovies();
    return () => { setMovies([]) };
  }, [])

  useEffect(() => {
    setSearchedMoviesWithOwner(() => addOwnerStatusToMovie(searchedMovies, savedMovies));
  }, [searchedMovies, savedMovies])

  return (
    <main className="movies">
      <SearchForm
        path={'/movies'}
        handleMoviesSearch={handleMoviesSearchCb}
      />
      {searchedMovies.length !== 0 &&
        <MoviesCardList
          path={'/movies'}
          movies={searchedMoviesWithOwner}
          cardPlace={"movie"}
          onAddMoviesCount={handleAddMoviesCount}
        />
      }
      {!isFirstRequest && !loading && searchedMoviesWithOwner.length === 0 && <p className="movies__error">Ничего не найдено</p>}
      {error &&
        <p className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз</p>
      }
      {!isLoggedIn && <Preloader />}
    </main>
  );
};

export default Movies;
