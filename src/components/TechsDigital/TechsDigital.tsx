import './TechsDigital.css'
import React, {FC} from 'react';

const TechsDigital: FC = () => {

  const text = '<> HTML </>'

  return (
    <div className='techs-digital'>
      <p className='techs-digital__text'>{text}</p>
      <div className='techs-digital__green-circle'></div>
      <div className='techs-digital__green-dashes'></div>
      <div className='techs-digital__green-dashes-2'></div>
    </div>
  );
};

export default TechsDigital;
