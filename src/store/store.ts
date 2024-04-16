import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '../services/api';
import { filmsReducer } from '../store/films-slice';
import { commentsReducer } from './comments-slice';
import { userReducer } from './user-slice';
import { favoritesReducer } from './favorites-slice';

export const api = createApi();
export const store = configureStore({
  reducer: {
    films: filmsReducer,
    comments: commentsReducer,
    user: userReducer,
    favorites: favoritesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
