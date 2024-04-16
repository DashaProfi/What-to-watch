import { useDispatch } from 'react-redux';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { AppDispatch, AppState } from '../../types/store';
import { useEffect, useState } from 'react';
import { getOneFilm, getSimilarFilms } from '../../store/films-slice';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PageNotFound from '../page-not-found/page-not-found';
import FilmList from '../../components/film-list/film-list';
import MoviePageDescription from '../../components/movie-page-description/movie-page-description';
import { getComments } from '../../store/comments-slice';
import MoviePageButtons from '../../components/movie-page-buttons/movie-page-buttons';

const MoviePage = (): JSX.Element => {
  const { oneFilm, similarFilms, error } = useSelector(
    (state: AppState) => state.films
  );
  const dispatch: AppDispatch = useDispatch();
  const { comments } = useSelector((state: AppState) => state.comments);

  const { id: filmIdStr } = useParams();

  useEffect(() => {
    if (filmIdStr) {
      dispatch(getOneFilm(filmIdStr));
      dispatch(getSimilarFilms(filmIdStr));
      dispatch(getComments(filmIdStr));
    }
  }, [filmIdStr]);

  return (
    <>
      {error ? (
        <PageNotFound />
      ) : (
        oneFilm && (
          <>
            <section
              style={{ backgroundColor: `${oneFilm.backgroundColor}` }}
              className='film-card film-card--full'
            >
              <div className='film-card__hero'>
                <div className='film-card__bg'>
                  <img src={oneFilm.backgroundImage} alt={oneFilm.name} />
                </div>

                <h1 className='visually-hidden'>WTW</h1>
                <Header />
                <div className='film-card__wrap'>
                  <div className='film-card__desc'>
                    <h2 className='film-card__title'>{oneFilm.name}</h2>
                    <p className='film-card__meta'>
                      <span className='film-card__genre'>{oneFilm.genre}</span>
                      <span className='film-card__year'>
                        {oneFilm.released}
                      </span>
                    </p>
                    <MoviePageButtons oneFilm={oneFilm} />
                  </div>
                </div>
              </div>

              <div className='film-card__wrap film-card__translate-top'>
                <div className='film-card__info'>
                  <div className='film-card__poster film-card__poster--big'>
                    <img
                      src={oneFilm.posterImage}
                      alt={oneFilm.name}
                      width='218'
                      height='327'
                    />
                  </div>
                  <MoviePageDescription oneFilm={oneFilm} comments={comments} />
                </div>
              </div>
            </section>

            <div className='page-content'>
              <section className='catalog catalog--like-this'>
                <h2 className='catalog__title'>More like this</h2>
                <div className='catalog__films-list'>
                  <FilmList filmList={similarFilms} />
                </div>
              </section>
              <Footer />
            </div>
          </>
        )
      )}
    </>
  );
};

export default MoviePage;
