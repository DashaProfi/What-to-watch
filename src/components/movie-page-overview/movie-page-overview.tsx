import { useEffect, useState } from 'react';
import { Film } from '../../types/types';
import MoviePageReviews from '../movie-page-reviews/movie-page-reviews';
interface MoviePageOverviewProps {
  oneFilm: Film;
}

const MoviePageOverview = ({
  oneFilm,
}: MoviePageOverviewProps): JSX.Element => {
  const [filmRatingDescription, setFilmRatingDescription] = useState('');
  const [stars, setStars] = useState<string[]>([]);
  const filmRating = oneFilm?.rating;

  const getFilmRatingDescription = (rating: number) => {
    if (rating < 3) {
      return 'Bad';
    } else if (rating >= 3 && rating < 5) {
      return 'Normal';
    } else if (rating >= 5 && rating < 8) {
      return 'Good';
    } else if (rating >= 8 && rating < 10) {
      return 'Very good';
    } else if ((rating = 10)) {
      return 'Awesome';
    }
    return '';
  };

  useEffect(() => {
    if (filmRating) {
      setFilmRatingDescription(getFilmRatingDescription(filmRating));
    }
    if (oneFilm?.starring) {
      setStars(oneFilm?.starring);
    }
  }, [filmRating]);

  return (
    <>
      <div className='film-rating'>
        <div className='film-rating__score'>{oneFilm.rating}</div>
        <p className='film-rating__meta'>
          <span className='film-rating__level'>{filmRatingDescription}</span>
          <span className='film-rating__count'>
            {oneFilm.scoresCount} ratings
          </span>
        </p>
      </div>

      <div className='film-card__text'>
        <p>{oneFilm.description}</p>
        <p className='film-card__director'>
          <strong>Director: {oneFilm.director}</strong>
        </p>

        <p className='film-card__starring'>
          <strong>
            Starring:{' '}
            {stars.map((star, index) => {
              if (index < stars.length - 1) {
                return star + ', ';
              }
              return star;
            })}{' '}
            and other
          </strong>
        </p>
      </div>
    </>
  );
};

export default MoviePageOverview;
