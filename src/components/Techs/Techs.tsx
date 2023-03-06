import './Techs.css'
import React, {FC} from 'react';
import PageTitle from "../PageTitle/PageTitle";

interface TechsProps {
  techs: string[]
}

const Techs: FC<TechsProps> = ({ techs }) => {
  return (
    <section className="techs">
      <PageTitle title={"Технологии"} mixClass={"techs__title"}/>
      <article className="techs__content">
        <h2 className="techs__main-title">7 технологий</h2>
        <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </article>
      <ul className="techs__list">
        {techs.map((tech, i) => {
          return <li key={i} className="techs__list-item">{tech}</li>
        })}
      </ul>
    </section>
  );
};

export default Techs;
