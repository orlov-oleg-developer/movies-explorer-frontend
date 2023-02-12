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
    <main>
      <SearchForm
        path={page}
        handleMoviesSearch={handleMoviesSearchCb}
      />
      {savedMoviesList.length !== 0
        ? <MoviesCardList
            movies={savedMoviesList}
            cardPlace={"saved-movie"}
            moviesCount={totalCount}
            addMoviesCount={handleAddMoviesCountCb}
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

export default SavedMovies;
