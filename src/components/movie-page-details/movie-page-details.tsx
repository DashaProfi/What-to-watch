import { useEffect, useState } from 'react';
import { Film } from '../../types/types';
import { convertTime } from '../../services/convert-time';

interface MoviePageDetailsProps {
  oneFilm: Film;
}

const MoviePageDetails = ({ oneFilm }: MoviePageDetailsProps): JSX.Element => {
  const [stars, setStars] = useState<string[]>([]);
  useEffect(() => {
    if (oneFilm?.starring) {
      setStars(oneFilm?.starring);
    }
  }, [oneFilm]);
  return (
    <>
      <div className='film-card__text film-card__row'>
        <div className='film-card__text-col'>
          <p className='film-card__details-item'>
            <strong className='film-card__details-name'>Director</strong>
            <span className='film-card__details-value'>{oneFilm.director}</span>
          </p>
          <p className='film-card__details-item'>
            <strong className='film-card__details-name'>Starring</strong>
            <span className='film-card__details-value'>
              {stars.map((star, index) => {
                if (index < stars.length - 1) {
                  return (
                    <span key={star}>
                      {' '}
                      {star + ', '}
                      <br />
                    </span>
                  );
                }
                return star;
              })}{' '}
            </span>
          </p>
        </div>

        <div className='film-card__text-col'>
          <p className='film-card__details-item'>
            <strong className='film-card__details-name'>Run Time</strong>
            <span className='film-card__details-value'>
              {convertTime(oneFilm.runTime)}
            </span>
          </p>
          <p className='film-card__details-item'>
            <strong className='film-card__details-name'>Genre</strong>
            <span className='film-card__details-value'>{oneFilm.genre}</span>
          </p>
          <p className='film-card__details-item'>
            <strong className='film-card__details-name'>Released</strong>
            <span className='film-card__details-value'>{oneFilm.released}</span>
          </p>
        </div>
      </div>
    </>
  );
};
export default MoviePageDetails;
