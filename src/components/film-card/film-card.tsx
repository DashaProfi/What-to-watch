import { Link } from 'react-router-dom';
import { Film } from '../../types/types';
import { useRef, useState } from 'react';

interface FilmCardProps {
  film: Film;
}
function FilmCard({ film }: FilmCardProps): JSX.Element {
  const videoTag = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePointerOver = () => {
    if (videoTag.current) {
      !isPlaying && videoTag.current.play();
      setIsPlaying(true);
    }
  };

  const handlePointerOut = () => {
    if (videoTag.current) {
      if (isPlaying) {
        videoTag.current.pause();
        setIsPlaying(false);
        videoTag.current.src = film.previewVideoLink;
      }
    }
  };

  return (
    <article className='small-film-card catalog__films-card'>
      <Link
        to={`/films/${film.id}`}
        className='small-film-card__link'
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <div className='small-film-card__image'>
          <video
            ref={videoTag}
            poster={film.previewImage}
            src={film.previewVideoLink}
            width='280'
            height='175'
            loop
            muted
          />
        </div>
        <h3 className='small-film-card__title'>{film.name}</h3>
      </Link>
    </article>
  );
}

export default FilmCard;
