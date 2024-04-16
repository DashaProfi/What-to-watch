import { Film, Comments } from '../../types/types';
import MoviePageDetails from '../movie-page-details/movie-page-details';
import MoviePageOverview from '../movie-page-overview/movie-page-overview';
import MoviePageReviews from '../movie-page-reviews/movie-page-reviews';

interface TabsProps {
  activeTab: number;
  oneFilm: Film;
  comments: Comments;
}

const Tabs = ({ activeTab, oneFilm, comments }: TabsProps): JSX.Element => {
  switch (activeTab) {
    case 1:
      return <MoviePageDetails oneFilm={oneFilm} />;
    case 2:
      return <MoviePageReviews comments={comments} />;
    default:
      return <MoviePageOverview oneFilm={oneFilm} />;
  }
};

export default Tabs;
