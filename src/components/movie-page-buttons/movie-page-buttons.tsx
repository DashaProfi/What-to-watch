import { Link, Navigate, useLocation } from 'react-router-dom';
import { ApiRoutes, AppRoutes, AuthorizationStatus } from '../../const/const';
import { useEffect, useState } from 'react';
import { AppDispatch, AppState } from '../../types/store';
import { useDispatch, useSelector } from 'react-redux';
import { getFavorites, postFilmStatus } from '../../store/favorites-slice';
import { Film, FilmId } from '../../types/types';

interface MoviePageButtonsProps {
  oneFilm: Film | null;
}

const MoviePageButtons = ({ oneFilm }: MoviePageButtonsProps): JSX.Element => {
  const location = useLocation();
  const { favorites } = useSelector((state: AppState) => state.favorites);
  const { authorizationStatus } = useSelector((state: AppState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const [status, setStatus] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (oneFilm?.isFavorite) {
      setStatus(1);
    }
  }, [oneFilm?.isFavorite]);

  useEffect(() => {
    dispatch(getFavorites());
  }, []);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      setIsDisabled(true);
    }
  }, [authorizationStatus]);

  const handleClickMyList = () => {
    if (status === 0) {
      setStatus(1);
      dispatch(postFilmStatus(1));
    } else {
      setStatus(0);
      dispatch(postFilmStatus(0));
    }
  };

  return (
    <div className='film-card__buttons'>
      <Link
        to={`/${ApiRoutes.Player}/${oneFilm?.id}`}
        className='btn btn--play film-card__button'
        type='button'
      >
        <svg viewBox='0 0 19 19' width='19' height='19'>
          <use xlinkHref='#play-s'></use>
        </svg>
        <span>Play</span>
      </Link>
      <button
        className='btn btn--list film-card__button'
        type='button'
        onClick={handleClickMyList}
        disabled={isDisabled}
      >
        {status === 1 ? (
          <svg viewBox='0 0 18 14' width='18' height='14'>
            <use xlinkHref='#in-list' />
          </svg>
        ) : (
          <svg viewBox='0 0 19 20' width='19' height='20'>
            <use xlinkHref='#add'></use>
          </svg>
        )}
        <span>My list</span>
        <span className='film-card__count'>{favorites.length}</span>
      </button>

      {location.pathname !== AppRoutes.Main ? (
        <Link to={AppRoutes.AddReview} className='btn film-card__button'>
          Add review
        </Link>
      ) : (
        ''
      )}
    </div>
  );
};

export default MoviePageButtons;
