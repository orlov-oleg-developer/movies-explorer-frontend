import './PageTitle.css'

const PageTitle = ({title, mixClass}) => {
  return (
    <h2 className={`title ${mixClass}`}>{title}</h2>
  );
};

export default PageTitle;
