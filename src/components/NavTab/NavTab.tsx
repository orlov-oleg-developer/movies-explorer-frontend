import './NavTab.css'
import React, {FC} from 'react';

interface NavTabProps {
  aboutProject: Element | null;
  techs: Element | null;
  aboutMe: Element | null;
}

const NavTab: FC<NavTabProps> = ({ aboutProject, techs, aboutMe }) => {
  return (
    <nav className="nav-tab">
      <button
        onClick={() => aboutProject?.scrollIntoView({
          behavior: 'smooth'})}
        className="nav-tab__link"
      >О проекте</button>
      <button
        onClick={() => techs?.scrollIntoView({
          behavior: 'smooth'})}
        className="nav-tab__link"
      >Технологии</button>
      <button
        onClick={() => aboutMe?.scrollIntoView({
          behavior: 'smooth'})}
        className="nav-tab__link"
      >Студент</button>
    </nav>
  );
};

export default NavTab;
