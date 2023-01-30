import './AboutProject.css'
import PageTitle from "../UI/PageTitle/PageTitle";

const AboutProject = () => {
  return (
    <section className={`about-project`}>
      <PageTitle title={"О проекте"} mixClass={"about-project__title"}/>
      <article className="about-project__content">
        <div className="about-project__content-item">
          <h3 className="about-project__content-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__content-description">Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__content-item">
          <h3 className="about-project__content-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__content-description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно
            было соблюдать, чтобы успешно защититься.</p>
        </div>
      </article>
      <div className="about-project__progress">
        <p className="about-project__progress-item about-project__progress-item_color_black">1 неделя</p>
        <p className="about-project__progress-item about-project__progress-item_color_gray">4 недели</p>
        <p className="about-project__progress-item about-project__progress-item_label">Back-end</p>
        <p className="about-project__progress-item about-project__progress-item_label">Front-end</p>
      </div>
    </section>
  );
};

export default AboutProject;
