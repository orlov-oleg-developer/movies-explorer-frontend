import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

import {useEffect, useRef} from "react";

const Main = () => {

  return (
    <main>
      <Promo className="App__promo"/>
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
