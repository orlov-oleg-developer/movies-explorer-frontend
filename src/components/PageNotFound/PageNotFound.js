import './PageNotFound.css'
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <main className="page-not-found">
      <h1 className="page-not-found__title">404</h1>
      <p className="page-not-found__subtitle">Страница не найдена</p>
      <Link className="page-not-found__link">Назад</Link>
    </main>
  );
};

export default PageNotFound;
