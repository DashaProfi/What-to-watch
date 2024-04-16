import { useState } from 'react';
import { Link } from 'react-router-dom';
import Tabs from '../tabs/tabs';
import { Film, Comments } from '../../types/types';

interface MoviePageDescriptionProps {
  oneFilm: Film;
  comments: Comments;
}

const MoviePageDescription = ({
  oneFilm,
  comments,
}: MoviePageDescriptionProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className='film-card__desc'>
      <nav className='film-nav film-card__nav'>
        <ul className='film-nav__list'>
          <li
            className={`film-nav__item ${
              activeTab === 0 ? 'film-nav__item--active' : ' '
            }`}
          >
            <Link
              to=''
              className='film-nav__link'
              onClick={() => setActiveTab(0)}
            >
              Overview
            </Link>
          </li>
          <li
            className={`film-nav__item ${
              activeTab === 1 ? 'film-nav__item--active' : ' '
            }`}
          >
            <Link
              to=' '
              className='film-nav__link'
              onClick={() => setActiveTab(1)}
            >
              Details
            </Link>
          </li>
          <li
            className={`film-nav__item ${
              activeTab === 2 ? 'film-nav__item--active' : ' '
            }`}
          >
            <Link
              to=''
              className='film-nav__link'
              onClick={() => setActiveTab(2)}
            >
              Reviews
            </Link>
          </li>
        </ul>
      </nav>
      <Tabs activeTab={activeTab} oneFilm={oneFilm} comments={comments} />
    </div>
  );
};
export default MoviePageDescription;
