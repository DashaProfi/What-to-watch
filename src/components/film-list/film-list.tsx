import { FilmsList } from '../../types/types';
import FilmCard from '../film-card/film-card';

interface FilmListProps {
  filmList: FilmsList;
}

const FilmList = ({ filmList }: FilmListProps) => {
  return (
    <div className='catalog__films-list'>
      {filmList.map((film) => (
        <FilmCard film={film} key={`Card${film.id}`} />
      ))}
    </div>
  );
};

export default FilmList;
