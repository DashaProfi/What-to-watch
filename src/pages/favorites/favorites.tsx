import { useSelector } from 'react-redux';
import FilmCard from '../../components/film-card/film-card';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { AppDispatch, AppState } from '../../types/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getFavorites } from '../../store/favorites-slice';
import { AppRoutes, AuthorizationStatus } from '../../const/const';
import { Navigate } from 'react-router-dom';

const Favorites = (): JSX.Element => {
  const { favorites } = useSelector((state: AppState) => state.favorites);
  const { authorizationStatus } = useSelector((state: AppState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getFavorites());
  }, []);

  return (
    <div className='user-page'>
      {authorizationStatus === AuthorizationStatus.AUTH ? (
        <>
          <Header />
          <section className='catalog'>
            <h2 className='catalog__title visually-hidden'>Catalog</h2>
            <FilmList filmList={favorites} />
          </section>
          <Footer />
        </>
      ) : (
        <Navigate to={AppRoutes.SignIn} />
      )}
    </div>
  );
};

export default Favorites;
