import './Portfolio.css'
import React, { FC } from 'react';
import linkToIconPath from "../../images/link-icon.svg";

const Portfolio: FC = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            href="https://orlov-oleg-developer.github.io/how-to-learn/"
            target="_blank"
            className="portfolio__list-link"
          >
            <p className="portfolio__list-link-text">Статичный сайт</p>
            <div
              className="portfolio__list-icon"
              style={{ backgroundImage: `url(${linkToIconPath})` }}
            />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://orlov-oleg-developer.github.io/russian-travel/"
            target="_blank"
            className="portfolio__list-link"
          >
            <p className="portfolio__list-link-text">Адаптивный сайт</p>
            <div
              className="portfolio__list-icon"
              style={{ backgroundImage: `url(${linkToIconPath})` }}
            />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://orlov.developer.nomoredomains.club/"
            target="_blank"
            className="portfolio__list-link"
          >
            <p className="portfolio__list-link-text">Одностраничное приложение</p>
            <div
              className="portfolio__list-icon"
              style={{ backgroundImage: `url(${linkToIconPath})` }}
            />
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
