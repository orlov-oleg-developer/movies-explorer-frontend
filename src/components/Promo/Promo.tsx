import './Promo.css'
import React, { FC } from 'react';
import NavTab from "../NavTab/NavTab";

interface PromoProps {
  className: string;
  aboutProjectRef: Element | null;
  techsRef: Element | null;
  aboutMeRef: Element | null;
}

const Promo: FC<PromoProps> = ({ className, aboutProjectRef, techsRef, aboutMeRef }) => {
  return (
    <div className={`promo ${className}`}>
      <h1 className="promo__text">Учебный проект студента факультета Веб-разработки.</h1>
      <NavTab
        aboutProject={aboutProjectRef}
        techs={techsRef}
        aboutMe={aboutMeRef}
      />
    </div>
  );
};

export default Promo;
