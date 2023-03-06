import './AboutMe.css'
import PageTitle from "../PageTitle/PageTitle"
import imagePath from '../../images/photo.png';
import linkToIconPath from "../../images/link-icon.svg";
import React, {FC} from 'react';

const AboutMe: FC = () => {
  return (
    <section className="about-me">
      <PageTitle title={"Студент"} mixClass={"about-me__title"}/>
      <article className="about-me__grid">
        <div className="about-me__content">
          <h3 className="about-me__content-title">Орлов Олег</h3>
          <p className="about-me__content-subtitle">Фронтенд-разработчик, 25 лет</p>
          <p className="about-me__content-description">Еще с детства я увлекся программированием.
            Решив большое количество задач, я понял, что могу объяснять сложные вещи простыми словами.
            Для этого я записывал обучающие ролики на YouTube и устраивал небольшие соревнования с подписчиками.
            В университете я начал разрабатывать ПО для студентов, чтобы им было проще разбираться в материале.
            За реализацией одного из проектов я познакомился с веб-разработкой и понял, что я давно искал именно этого.
            Меня поразило то, что для реализации любых идей можно воспользоваться веб-технологиями, что открывает
            большой спектр возможностей. Мне интересна веб разработка в целом, но больше я склоняюсь к фронтенд разработке,
            так как быстро получаешь результат.
          </p>
        </div>

        <a className="about-me__content-link" href="#">
          <p className="about-me__link-text">GitHub</p>
          <div
            className="about-me__link-icon"
            style={{ backgroundImage: `url(${linkToIconPath})`}}
          />
        </a>
        <img className="about-me__content-photo" src={imagePath} alt="Фотография студента"/>
      </article>
    </section>
  );
};

export default AboutMe;
