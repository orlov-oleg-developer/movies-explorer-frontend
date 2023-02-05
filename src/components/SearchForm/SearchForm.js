import './SearchForm.css'
import searchIconPath from "../../images/search-icon.svg";
import arrowButtonIconPath from "../../images/arrow-button.svg";
import toggleActiveIconPath from "../../images/toggle-active.svg";
import toggleDisableIconPath from "../../images/toggle-disable.svg";
import useInput from "../../hooks/useInput.js";

const SearchForm = ({handleMoviesSearch, toggleStatus, setToggleState}) => {

  const handleToggle = () => setToggleState(!toggleStatus)

  const handleSubmit = (event) => {
    event.preventDefault();
    handleMoviesSearch(movieInput.value, toggleStatus);
  };

  const movieInput = useInput(
    '',
    {
      isEmpty: true,
      minLength: 1,
    }
  );

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
              // required
              onChange={(event) => movieInput.onChange(event)}
              onBlur={() => movieInput.onBlur()}
            />
            {(movieInput.isDirty && movieInput.minLengthError.state) &&
              <span className="search-form__input-error">{movieInput.minLengthError.errorMessage}</span>
            }
          </label>
          <button
            disabled={movieInput.isInputValid ? false : true}
            type={"submit"}
            className={`search-form__button ${movieInput.isInputValid && 'search-form__button_active'}`}
            style={{ backgroundImage: `url(${arrowButtonIconPath})`}}
          />
        </form>
      </div>
      <div className="search-form__filter">
        <button
          className="search-form__toggle"
          style={{ backgroundImage: `url(${toggleStatus ? toggleActiveIconPath : toggleDisableIconPath})`}}
          onClick={handleToggle}
        />
        <p className="search-form__filter-name">Короткометражки</p>
      </div>
    </section>
  );
};

export default SearchForm;
