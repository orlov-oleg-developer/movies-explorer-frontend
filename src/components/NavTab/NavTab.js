import './NavTab.css'

const NavTab = ({ aboutProject, techs, aboutMe }) => {

  return (
    <nav className="nav-tab">
      <button
        onClick={() => aboutProject.scrollIntoView({
          behavior: 'smooth'})}
        className="nav-tab__link"
      >О проекте</button>
      <button
        onClick={() => techs.scrollIntoView({
          behavior: 'smooth'})}
        className="nav-tab__link"
      >Технологии</button>
      <button
        onClick={() => aboutMe.scrollIntoView({
          behavior: 'smooth'})}
        className="nav-tab__link"
      >Студент</button>
    </nav>
  );
};

export default NavTab;
