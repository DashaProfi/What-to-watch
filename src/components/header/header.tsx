import { useSelector } from 'react-redux';
import { ApiRoutes, AppRoutes, AuthorizationStatus } from '../../const/const';
import { AppDispatch, AppState } from '../../types/store';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/user-slice';

const Header = (): JSX.Element => {
  const { authorizationStatus } = useSelector((state: AppState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const { pathname } = useLocation();

  const currentClassPageHeader = new Map();
  currentClassPageHeader.set(AppRoutes.Main, 'film-card__head');
  currentClassPageHeader.set(AppRoutes.SignIn, 'user-page__head');
  currentClassPageHeader.set(AppRoutes.Favorites, 'user-page__head');

  const handleClickLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <header className={`${currentClassPageHeader.get(pathname)} page-header`}>
      <div className='logo'>
        <a className='logo__link' href='/#'>
          <span className='logo__letter logo__letter--1'>W</span>
          <span className='logo__letter logo__letter--2'>T</span>
          <span className='logo__letter logo__letter--3'>W</span>
        </a>
      </div>

      <ul className='user-block'>
        {authorizationStatus === AuthorizationStatus.AUTH &&
        pathname !== AppRoutes.SignIn ? (
          <>
            <li className='user-block__item'>
              <div className='user-block__avatar'>
                <Link to={AppRoutes.Favorites}>
                  <img
                    src='img/avatar.jpg'
                    alt='User avatar'
                    width='63'
                    height='63'
                  />
                </Link>
              </div>
            </li>
            <li className='user-block__item'>
              <Link
                to=''
                className='user-block__link'
                onClick={handleClickLogout}
              >
                Sign out
              </Link>
            </li>
          </>
        ) : (
          pathname !== AppRoutes.SignIn && (
            <Link to={AppRoutes.SignIn} className='user-block__link'>
              Sign in
            </Link>
          )
        )}
      </ul>

      {pathname === AppRoutes.SignIn ? (
        <h1 className='page-title user-page__title'>Sign in</h1>
      ) : (
        ''
      )}
      {pathname === AppRoutes.Favorites ? (
        <h1 className='page-title user-page__title'>My list</h1>
      ) : (
        ''
      )}
    </header>
  );
};
export default Header;
