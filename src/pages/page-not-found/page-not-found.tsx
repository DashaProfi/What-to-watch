import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const/const';

const PageNotFound = (): JSX.Element => (
  <div>
    <h1>404 Not Found</h1>
    <p>
      Страница не найдена, но Вы можете перейти{' '}
      <Link to={AppRoutes.Main}> на главную страницу</Link>
    </p>
  </div>
);

export default PageNotFound;
