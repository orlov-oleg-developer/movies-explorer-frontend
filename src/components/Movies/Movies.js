import './Movies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

const Movies = (
  {
    handleMoviesSearchCb,
    handleAddMoviesCountCb,
    handleLikeMovie,
    handleDeleteMovie,
    moviesList,
    isLoading,
    totalCount,
    toggleState,
    setToggleStateCb,
    errorMessage,
  }) => {

  return (
    <main className="movies">
      <SearchForm
        handleMoviesSearch={handleMoviesSearchCb}
        toggleStatus={toggleState}
        setToggleStatus={setToggleStateCb}
      />
      {moviesList.length !== 0
        ?
        <MoviesCardList
          movies={moviesList}
          cardPlace={"movie"}
          moviesCount={totalCount}
          addMoviesCount={handleAddMoviesCountCb}
          handleLikeMovieCb={handleLikeMovie}
          handleMovieDeleteCb={handleDeleteMovie}
        />
        :
        errorMessage
          ? <p>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
            Подождите немного и попробуйте ещё раз</p>
          : <p>Ничего не найдено</p>
      }
      {isLoading && <Preloader />}
    </main>
  );
};

export default Movies;
