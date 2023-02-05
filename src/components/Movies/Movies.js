import './Movies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

const Movies = (
  {
    handleMoviesSearchCb,
    moviesList,
    isLoading,
    totalCount,
    handleAddMoviesCountCb,
    toggleState,
    setToggleStateCb,
}) => {
  return (
    <main className="movies">
      <SearchForm
        handleMoviesSearch={handleMoviesSearchCb}
        toggleStatus={toggleState}
        setToggleState={setToggleStateCb}
      />
      {moviesList.length !== 0
        ?
        <MoviesCardList
          movies={moviesList}
          cardPlace={"movie"}
          moviesCount={totalCount}
          addMoviesCount={handleAddMoviesCountCb}
        />
        :
        <p>Ничего не найдено</p>
      }
      {isLoading && <Preloader />}
    </main>
  );
};

export default Movies;
