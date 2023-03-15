import './Movies.css'
import React, {FC, useEffect, useState} from 'react';
import SearchForm from "../SearchForm/SearchForm";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import useSearch from "../../hooks/useSearch";
import Preloader from "../Preloader/Preloader";

interface MoviesProps {
  isLoggedIn: boolean;
  totalCount: number,
}

const Movies: FC<MoviesProps> = ({isLoggedIn, totalCount}) => {
  const { getMovies, setMovies } = useActions();
  const [ isFirstRequest, setIsFirstRequest ] = useState(true);
  const { movies, error, loading } = useTypedSelector(state => state.movies);
  const { savedMovies } = useTypedSelector(state => state.savedMovies);
  const [ moviesSearchQuery, setMoviesSearchQuery ] = useState('');
  const [ moviesToggleState, setMoviesToggleState ] = useState(false);
  const searchedMovies = useSearch(movies, moviesSearchQuery, moviesToggleState);
  const [ searchedMoviesWithOwner, setSearchedMoviesWithOwner ] = useState<any[]>([]);

  const handleMoviesSearchCb = (searchQuery: string, toggleState: boolean) => {
    if (isFirstRequest) {
      setIsFirstRequest(true)
      return;
    }
    if (searchQuery) {
      setMoviesSearchQuery(searchQuery)
    };
    if (toggleState !== null) {
      setMoviesToggleState(toggleState)
    };
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
      return (ownerStatus ? {...movie, owner: true} : {...movie, owner: false});
    })
  }

  useEffect(() => {
    const moviesList = localStorage.getItem('movies');
    if (moviesList) {
      setMovies(JSON.parse(moviesList))
    } else getMovies();
  }, [])

  useEffect(() => {
    setSearchedMoviesWithOwner(() => addOwnerStatusToMovie(searchedMovies, savedMovies));
  }, [ searchedMovies, savedMovies ])

  return (
    <main className="movies">
      <SearchForm
        path={'/movies'}
        handleMoviesSearch={handleMoviesSearchCb}
        isFirstRequest={isFirstRequest}
      />
      {searchedMovies.length !== 0 &&
        <MoviesCardList
          path={'/movies'}
          movies={searchedMoviesWithOwner}
          cardPlace={"movie"}
          moviesCount={totalCount}
          // addMoviesCount={handleAddMoviesCountCb}
        />
      }
      {!isFirstRequest && searchedMoviesWithOwner.length === 0 && <p className="movies__error">Ничего не найдено</p>}
      {/*{!isFirstRequest && movies.length === 0 && <p className="movies__error">Ничего не найдено</p>}*/}
      {/*{errorMessage &&*/}
      {/*  <p className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.*/}
      {/*    Подождите немного и попробуйте ещё раз</p>*/}
      {/*}*/}
      {!isLoggedIn && <Preloader />}
    </main>
  );
};

export default Movies;
