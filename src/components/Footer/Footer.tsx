import './Footer.css'
import React, { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__grid">
        <p className="footer__text footer__text_value_year">&copy; 2023</p>
        <p className="footer__text footer__text_value_yandex">Яндекс.Практикум</p>
        <p className="footer__text footer__text_value_git-hub">Github</p>
      </div>
    </footer>
  );
};

export default Footer;
