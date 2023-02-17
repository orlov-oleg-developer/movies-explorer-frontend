import "./SavedMovies.css"

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

const SavedMovies = (
  {
    page,
    handleMoviesSearchCb,
    handleAddMoviesCountCb,
    handleDeleteMovie,
    savedMoviesList,
    totalCount,
    errorMessage,
    isLoading
  }) => {
  return (
    <main className="saved-movies">
      <SearchForm
        path={page}
        handleMoviesSearch={handleMoviesSearchCb}
      />
      {savedMoviesList.length !== 0 &&
        <MoviesCardList
          path={page}
          movies={savedMoviesList}
          cardPlace={"saved-movie"}
          moviesCount={totalCount}
          addMoviesCount={handleAddMoviesCountCb}
          handleMovieDeleteCb={handleDeleteMovie}
        />
      }
      {savedMoviesList.length === 0 && <p className="saved-movies__message">Сохраненных фильмов не найдено</p>}
      {errorMessage &&
        <p className="saved-movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз</p>
      }
      {isLoading && <Preloader />}
    </main>
  );
};

export default SavedMovies;
