import './Promo.css'
import NavTab from "../NavTab/NavTab";

const Promo = ({ className, aboutProjectRef, techsRef, aboutMeRef }) => {

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
