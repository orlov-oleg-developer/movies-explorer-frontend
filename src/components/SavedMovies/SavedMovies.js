import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

const SavedMovies = (
  {
    handleMoviesSearchCb,
    handleAddMoviesCountCb,
    handleDeleteMovie,
    savedMoviesList,
    totalCount,
    toggleState,
    setToggleStateCb,
    errorMessage,
    isLoading
  }) => {
  return (
    <main>
      <SearchForm
        handleMoviesSearch={handleMoviesSearchCb}
        toggleStatus={toggleState}
        setToggleStatus={setToggleStateCb}
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
