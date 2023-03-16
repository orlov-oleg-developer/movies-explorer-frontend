import './Menu.css';
import React, { FC } from 'react';
import { Link } from "react-router-dom";
import accountIconPath from "../../images/account-icon.svg";
import menuActiveIconPath from "../../images/menu-active-icon.svg";

interface MenuProps {
  isMenuActive: boolean;
  handleMenuButton: () => void
}

const Menu: FC<MenuProps> = ({ isMenuActive, handleMenuButton }) => {
  return (
    <div className={`menu ${isMenuActive && 'menu_active'}`}>
      <div
        className="menu__button"
        style={{ backgroundImage: `url(${menuActiveIconPath})` }}
        onClick={handleMenuButton}
      />
      <ul className="menu__list menu__list_active">
        <li><Link to="/" className="menu__list-item">Главная</Link></li>
        <li><Link to="/movies" className="menu__list-item">Фильмы</Link></li>
        <li><Link to="/saved-movies" className="menu__list-item">Сохранённые фильмы</Link></li>
        <li>
          <Link to="/profile" className="menu__navigation-account">
            <img className="menu__navigation-icon" alt="Иконка аккаунта" src={accountIconPath} />
            <p className="menu__navigation-text">Аккаунт</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
