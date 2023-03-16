import './Preloader.css'
import React, { FC } from 'react';

const Preloader: FC = () => {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
};

export default Preloader;
