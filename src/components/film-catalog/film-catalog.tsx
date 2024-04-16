import { useSelector } from 'react-redux';
import { FilmsList } from '../../types/types';
import { AppState } from '../../types/store';
import FilmCard from '../film-card/film-card';
import { FILMS_LIMIT, GENRES_LIMIT } from '../../const/const';
import { useEffect, useState } from 'react';
import GenresList from '../genres-list/genres-list';
import FilmList from '../film-list/film-list';

interface FilmCardListProps {
  allFilms: FilmsList;
}

const FilmCatalog = ({ allFilms }: FilmCardListProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filmListCurrentPage, setFilmListCurrentPage] = useState<FilmsList>([]);
  const [filteredFilmList, setFilteredFilmList] = useState<FilmsList>([]);
  const [currentGenre, setCurrentGenre] = useState('all');
  const [showButton, setShowButton] = useState(true);
  const { error } = useSelector((state: AppState) => state.films);

  const genresList = Array.from(
    new Set(allFilms.map((film) => film.genre))
  ).slice(0, GENRES_LIMIT);

  const handleShowMoreClick = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleFilterGenresClick = (genre: string) => {
    setCurrentPage(1);
    if (genre === 'all') {
      setFilteredFilmList(allFilms);
      setFilmListCurrentPage(allFilms.slice(0, FILMS_LIMIT));
      setCurrentGenre('all');
    } else {
      setCurrentGenre(genre);
      setFilteredFilmList(allFilms.filter((film) => film.genre === genre));
      setFilmListCurrentPage(
        allFilms.filter((film) => film.genre === genre).slice(0, FILMS_LIMIT)
      );
    }
  };

  useEffect(() => {
    setFilteredFilmList(allFilms);
  }, [allFilms]);

  useEffect(() => {
    if (currentGenre === 'all') {
      setFilmListCurrentPage(allFilms.slice(0, FILMS_LIMIT * currentPage));
    } else {
      setFilmListCurrentPage(
        allFilms
          .filter((film) => film.genre === currentGenre)
          .slice(0, FILMS_LIMIT * currentPage)
      );
    }
  }, [currentPage, allFilms]);

  useEffect(() => {
    setShowButton(filteredFilmList.length / FILMS_LIMIT > currentPage);
  }, [filteredFilmList, currentPage]);

  return (
    <>
      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>

        {!error ? (
          <>
            <GenresList
              genresList={genresList}
              handleFilterGenresClick={handleFilterGenresClick}
            />
            <FilmList filmList={filmListCurrentPage} />
            <div className='catalog__more'>
              {showButton ? (
                <button
                  className='catalog__button'
                  type='button'
                  onClick={handleShowMoreClick}
                >
                  Show more
                </button>
              ) : (
                ' '
              )}
            </div>
          </>
        ) : (
          <div>{error}</div>
        )}
      </section>
    </>
  );
};

export default FilmCatalog;
