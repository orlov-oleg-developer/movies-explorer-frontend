import './Promo.css'
import NavTab from "../NavTab/NavTab";

const Promo = ({className, aboutProjectRef}) => {
  return (
    <div className={`promo ${className}`}>
      <h1 className="promo__text">Учебный проект студента факультета Веб-разработки.</h1>
      <NavTab
        aboutRef={aboutProjectRef}
      />
    </div>
  );
};

export default Promo;
