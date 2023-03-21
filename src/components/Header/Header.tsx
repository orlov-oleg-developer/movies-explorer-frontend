import React, { FC, useState } from 'react';
import { NavLink, Link } from "react-router-dom";
import './Header.css'
import Menu from '../Menu/Menu';

import logoPath from '../../images/logo.svg';
import accountIconPath from '../../images/account-icon.svg';
import menuIconPath from '../../images/menu-icon.svg';

interface HeaderProps {
  className: string;
  isLoggedIn: boolean;
}

const Header: FC<HeaderProps> = ({ className, isLoggedIn }) => {
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  const handleMenuButton = (): void => {
    setIsMenuActive(!isMenuActive);
  }

  return (
    <>
      <header className={`header ${className}`}>
        <Link to="/"><img className="header__logo" alt="Логотип" src={logoPath} /></Link>
        {isLoggedIn
          ?
          <div className="header__navigation">
            <nav className="header__links">
              <NavLink
                to="/movies"
                className={({ isActive }) => isActive ? "header__links-link header__links-link_dedicated" : 'header__links-link'}
              >Фильмы</NavLink>
              <NavLink
                to="/saved-movies"
                className={({ isActive }) => isActive ? "header__links-link header__links-link_dedicated" : 'header__links-link'}
              >Сохранённые фильмы</NavLink>
            </nav>
            <Link to="/profile" className="header__navigation-account">
              <img className="header__navigation-icon" alt="Иконка аккаунта" src={accountIconPath} />
              <p className="header__navigation-text">Аккаунт</p>
            </Link >
            <div
              className="header__menu-button"
              style={{ backgroundImage: `url(${menuIconPath})` }}
              onClick={handleMenuButton}
            />
          </div>
          :
          <div className="header__buttons-container">
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
};

export default Header;
