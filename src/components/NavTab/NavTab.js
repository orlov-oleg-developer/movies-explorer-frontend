import './NavTab.css'

const NavTab = ({aboutRef}) => {

  return (
    <nav className="nav-tab">
      <button className="nav-tab__link">О проекте</button>
      <button className="nav-tab__link">Технологии</button>
      <button className="nav-tab__link">Студент</button>
    </nav>
  );
};

export default NavTab;
