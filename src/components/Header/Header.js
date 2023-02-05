import './Header.css';
import logoPath from '../../images/logo.svg';
import accountIconPath from '../../images/account-icon.svg';
import menuIconPath from '../../images/menu-icon.svg';
import { NavLink, Link } from "react-router-dom";
import Menu from "../Menu/Menu";

function Header({className, isLoggedIn, isMenuActive, handleMenuButton }) {
  return (
    <>
    <header className={`header ${className}`}>
      <Link to="/"><img className="header__logo" alt="Логотип" src={logoPath}/></Link>
      {isLoggedIn
        ? <div className="header__navigation">
            <nav className="header__links">
              <NavLink
                to="/movies"
                className="header__links-link"
                activeClassName="header__links-link_dedicated"
              >Фильмы</NavLink>
              <NavLink
                to="/saved-movies"
                className="header__links-link"
                activeClassName="header__links-link_dedicated"
              >Сохранённые фильмы</NavLink>
            </nav>
            <Link to="/profile" className="header__navigation-account">
              <img className="header__navigation-icon" alt="Иконка аккаунта" src={accountIconPath}/>
              <p className="header__navigation-text">Аккаунт</p>
            </Link >
            <div
              className="header__menu-button"
              style={{ backgroundImage: `url(${menuIconPath})`}}
              onClick={handleMenuButton}
            />
          </div>
        : <div className="header__buttons-container">
            <Link to="/signup" className="header__link">Регистрация</Link>
            <Link to="/signin" className="header__link header__link_state_login">Войти</Link>
          </div>
      }
    </header>
    <Menu
      isMenuActive={isMenuActive}
      handleMenuButton={handleMenuButton}
    />
    </>
  );
}

export default Header;
