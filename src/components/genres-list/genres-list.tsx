import { useState } from 'react';
import { Link } from 'react-router-dom';

interface GenresListProps {
  genresList: string[];
  handleFilterGenresClick: (genre: string) => void;
}

const GenresList = ({
  genresList,
  handleFilterGenresClick,
}: GenresListProps): JSX.Element => {
  const [currentGenre, setCurrentGenre] = useState('all');

  const handleClick = (genre: string) => {
    handleFilterGenresClick(genre);
    setCurrentGenre(genre);
  };

  return (
    <ul className='catalog__genres-list'>
      <li className='catalog__genres-item '>
        {/* catalog__genres-item--active */}
        <Link
          to='/#'
          className='catalog__genres-link'
          onClick={() => handleClick('all')}
        >
          All genres
        </Link>
      </li>
      {genresList.map((genre) => (
        <li className='catalog__genres-item' key={genre}>
          <Link
            to='/#'
            className='catalog__genres-link'
            onClick={() => handleClick(genre)}
          >
            {genre}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default GenresList;
