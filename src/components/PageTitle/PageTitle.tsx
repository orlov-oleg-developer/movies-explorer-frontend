import './PageTitle.css'
import React, {FC} from 'react';

interface PageTitleProps {
  title: string;
  mixClass: string;
}

const PageTitle: FC<PageTitleProps> = ({title, mixClass}) => {
  return (
    <h2 className={`title ${mixClass}`}>{title}</h2>
  );
};

export default PageTitle;
