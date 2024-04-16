import { useSelector } from 'react-redux';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { AppDispatch, AppState } from '../../types/store';
import FilmCatalog from '../../components/film-catalog/film-catalog';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPromoFilm } from '../../store/films-slice';
import { getFavorites } from '../../store/favorites-slice';
import MoviePageButtons from '../../components/movie-page-buttons/movie-page-buttons';
import { ApiRoutes, AppRoutes } from '../../const/const';
import { Link } from 'react-router-dom';

const Main = (): JSX.Element => {
  const { allFilms, promoFilm } = useSelector((state: AppState) => state.films);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getPromoFilm());
    dispatch(getFavorites);
  }, []);
  return (
    <>
      <section className='film-card'>
        <div className='film-card__bg'>
          <img src={promoFilm?.backgroundImage} alt={promoFilm?.name} />
        </div>

        <h1 className='visually-hidden'>WTW</h1>
        <Header />
        <div className='film-card__wrap'>
          <div className='film-card__info'>
            <div className='film-card__poster'>
              <Link to={`${ApiRoutes.Films}/${promoFilm?.id}`}>
                <img
                  src={promoFilm?.posterImage}
                  alt={promoFilm?.name}
                  width='218'
                  height='327'
                />
              </Link>
            </div>

            <div className='film-card__desc'>
              <h2 className='film-card__title'>{promoFilm?.name}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{promoFilm?.genre}</span>
                <span className='film-card__year'>{promoFilm?.released}</span>
              </p>
              <MoviePageButtons oneFilm={promoFilm} />
            </div>
          </div>
        </div>
      </section>

      <div className='page-content'>
        <FilmCatalog allFilms={allFilms} />

        <Footer />
      </div>
    </>
  );
};

export default Main;
