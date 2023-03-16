import React, { FC, useEffect, useState } from 'react';
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

const Main: FC = () => {

  const [aboutProjectRef, setAboutProjectRef] = useState<Element | null>(null);
  const [techsRef, setTechsRef] = useState<Element | null>(null);
  const [aboutMeRef, setAboutMeRef] = useState<Element | null>(null);

  useEffect(() => {
    setAboutProjectRef(window.document.querySelector('.about-project'));
    setTechsRef(window.document.querySelector('.techs'));
    setAboutMeRef(window.document.querySelector('.about-me'));
  }, [])

  return (
    <main>
      <Promo
        aboutProjectRef={aboutProjectRef}
        techsRef={techsRef}
        aboutMeRef={aboutMeRef}
        className="App__promo" />
      <AboutProject />
      <Techs
        techs={["HTML", "CSS", "JS", "React", "Git", "Express.js", "mongoDB"]}
      />
      <AboutMe />
      <Portfolio />
    </main>
  );
};

export default Main;
