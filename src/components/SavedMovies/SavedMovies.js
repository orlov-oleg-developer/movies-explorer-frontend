import './SavedMovies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

const SavedMovies = ({savedMoviesList}) => {
  return (
    <main>
      <SearchForm />
      {savedMoviesList.length !== 0 ? <MoviesCardList movies={savedMoviesList} cardPlace={"saved-movie"}/> : <Preloader />}
    </main>
  );
};

export default SavedMovies;
