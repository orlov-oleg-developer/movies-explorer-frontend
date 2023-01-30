import './SearchForm.css'
import searchIconPath from "../../images/search-icon.svg";
import arrowButtonIconPath from "../../images/arrow-button.svg";
import toggleActiveIconPath from "../../images/toggle-active.svg";
import toggleDisableIconPath from "../../images/toggle-disable.svg";
import {useState} from "react";

const SearchForm = () => {
  const [ toggleState, setToggleState ] = useState(true);

  const handleToggle = () => setToggleState(!toggleState)

  return (
    <section className="search-form">
      <div className="search-form__form-container">
        <div
          className="search-form__search-icon"
          style={{ backgroundImage: `url(${searchIconPath})`}}
        />
        <form
          className="search-form__form"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            className="search-form__input"
            placeholder="Фильм"
          />
          <button
            className="search-form__button"
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
