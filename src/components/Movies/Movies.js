import './Movies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

const Movies = (
  {
    page,
    handleMoviesSearchCb,
    handleAddMoviesCountCb,
    handleLikeMovie,
    handleDeleteMovie,
    moviesList,
    isLoading,
    totalCount,
    errorMessage,
    isFirstRequest,
  }) => {

  return (
    <main className="movies">
      <SearchForm
        path={page}
        handleMoviesSearch={handleMoviesSearchCb}
        isFirstRequest={isFirstRequest}
      />
      {moviesList.length !== 0 &&
        <MoviesCardList
          path={page}
          movies={moviesList}
          cardPlace={"movie"}
          moviesCount={totalCount}
          addMoviesCount={handleAddMoviesCountCb}
          handleLikeMovieCb={handleLikeMovie}
          handleMovieDeleteCb={handleDeleteMovie}
        />
      }
      {!isFirstRequest && moviesList.length === 0 && <p className="movies__error">Ничего не найдено</p>}
      {errorMessage &&
        <p className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз</p>
      }
      {isLoading && <Preloader />}
    </main>
  );
};

export default Movies;
