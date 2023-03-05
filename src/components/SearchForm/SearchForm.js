import './SearchForm.css'
import searchIconPath from "../../images/search-icon.svg";
import arrowButtonIconPath from "../../images/arrow-button.svg";
import toggleActiveIconPath from "../../images/toggle-active.svg";
import toggleDisableIconPath from "../../images/toggle-disable.svg";
import useInput from "../../hooks/useInput.js";
import { useEffect, useState } from "react";

const SearchForm = ({ path, handleMoviesSearch, isFirstRequest}) => {
  const [ toggleState, setToggleState ] = useState(false);
  const [ showError, setShowError ] = useState(false);

  const handleToggle = () => {
    setToggleState(!toggleState);
    if (path === '/movies') localStorage.setItem('toggle', JSON.stringify(!toggleState));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (movieInput.value === '') {
      setShowError(true);
      return;
    } else {
      handleMoviesSearch(movieInput.value, toggleState);
      setShowError(false);
    }
  };

  const movieInput = useInput(
    '',
    {
      isEmpty: true,
      minLength: 1,
    }
  );

  useEffect(() => {
    if (path === '/movies') {
      let toggle = JSON.parse(localStorage.getItem('toggle'));
      if (toggle !== null) {
        setToggleState(toggle);
      }

      let request = localStorage.getItem('movieRequest');
      if (request !== null && request !== '') {
        movieInput.onChange({target:{value:request}});
        handleMoviesSearch(request, toggleState);
      }
    } else handleMoviesSearch('', toggleState);
  }, [])

  useEffect(() => {
    if (movieInput.value) {
      handleMoviesSearch(movieInput.value, toggleState);
    }
  }, [ toggleState ])

  return (
    <section className="search-form">
      <div className="search-form__form-container">
        <div
          className="search-form__search-icon"
          style={{ backgroundImage: `url(${searchIconPath})`}}
        />
        <form
          className="search-form__form"
          onSubmit={handleSubmit}
        >
          <label className="search-form__field">
            <input
              className="search-form__input"
              name="form-movie-input"
              placeholder="Фильм"
              value={movieInput.value}
              onChange={(event) => {
                if (path === '/movies') localStorage.setItem('movieRequest', event.target.value)
                movieInput.onChange(event)
              }}
            />
            {(movieInput.isEmpty.state && showError) &&
              <span className="search-form__input-error">Нужно ввести ключевое слово</span>
            }
          </label>
          <button
            type={"submit"}
            className={`search-form__button search-form__button_active`}
            style={{ backgroundImage: `url(${arrowButtonIconPath})`}}
          />
        </form>
      </div>
      <div className="search-form__filter">
        <button
          className="search-form__toggle"
          style={{ backgroundImage: `url(${toggleState ? toggleActiveIconPath : toggleDisableIconPath})`}}
          onClick={handleToggle}
        />
        <p className="search-form__filter-name">Короткометражки</p>
      </div>
    </section>
  );
};

export default SearchForm;
