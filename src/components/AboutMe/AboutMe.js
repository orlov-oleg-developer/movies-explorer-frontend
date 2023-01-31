import './AboutMe.css'
import PageTitle from "../UI/PageTitle/PageTitle";
import imagePath from '../../images/photo.png';

const AboutMe = () => {
  return (
    <section className="about-me">
      <PageTitle title={"Студент"} mixClass={"about-me__title"}/>
      <article className="about-me__grid">
        <div className="about-me__content">
          <h3 className="about-me__content-title">Виталий</h3>
          <p className="about-me__content-subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__content-description">Я родился и живу в Саратове, закончил факультет экономики СГУ.
            У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
            фриланс-заказами и ушёл с постоянной работы.
          </p>
        </div>
        <a className="about-me__content-link" href="#">Github</a>
        <img className="about-me__content-photo" src={imagePath} alt="Фотография студента"/>
      </article>
    </section>
  );
};

export default AboutMe;
