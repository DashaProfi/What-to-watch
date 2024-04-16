import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import { AppRoutes, AuthorizationStatus } from '../../const/const';
import SignIn from '../../pages/sign-in/sign-in';
import MoviePage from '../../pages/movie-page/movie-page';
import Player from '../../pages/player/player';
import AddReview from '../../pages/add-review/add-review';
import PrivateRoute from '../private-route.tsx/private-route';
import Favorites from '../../pages/favorites/favorites';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import { useDispatch } from 'react-redux';
import { AppDispatch, AppState } from '../../types/store';
import { useEffect } from 'react';
import { getAllFilms } from '../../store/films-slice';
import { store } from '../../store/store';
import { getUserInfo } from '../../store/user-slice';
import { useSelector } from 'react-redux';

store.dispatch(getUserInfo());

const App = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFilms());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Main} element={<Main />} />
        <Route path={AppRoutes.SignIn} element={<SignIn />} />
        <Route path={AppRoutes.Film} element={<MoviePage />} />
        <Route path={AppRoutes.Player} element={<Player />} />
        <Route path={AppRoutes.AddReview} element={<AddReview />} />
        <Route
          path={AppRoutes.Favorites}
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path={'*'} element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
