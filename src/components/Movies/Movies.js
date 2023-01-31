import './Movies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

const Movies = ({moviesList}) => {
  return (
    <main>
      <SearchForm />
      {moviesList.length !== 0 ? <MoviesCardList movies={moviesList} cardPlace={"movie"}/> : <Preloader />}
    </main>
  );
};

export default Movies;
