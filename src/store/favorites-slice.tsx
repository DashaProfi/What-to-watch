import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoritesState, Film, FilmsList } from '../types/types';
import { ApiRoutes, BACKEND_URL } from '../const/const';
import { AxiosInstance } from 'axios';
import { AppState } from '../types/store';

export const getFavorites = createAsyncThunk<
  FilmsList,
  undefined,
  { extra: AxiosInstance }
>('@@favorites-getFavorites', async (_arg, { extra: api }) => {
  const { data: favorites } = await api.get<FilmsList>(
    `${BACKEND_URL}/${ApiRoutes.Favorite}`
  );
  return favorites;
});

const initialState: FavoritesState = {
  favorites: [],
};

export const postFilmStatus = createAsyncThunk<
  Film,
  number,
  { extra: AxiosInstance }
>('@@favorites-postFilmStatus', async (status, { extra: api, getState }) => {
  const { films } = getState() as AppState;
  const { data: favoriteFilm } = await api.post<Film>(
    `${BACKEND_URL}/${ApiRoutes.Favorite}/${films.filmId}/${status}`
  );
  return favoriteFilm;
});

const favoritesSlice = createSlice({
  name: '@@favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getFavorites.fulfilled,
        (state, action: PayloadAction<FilmsList>) => {
          state.favorites = action.payload;
        }
      )
      .addCase(
        postFilmStatus.fulfilled,
        (state, action: PayloadAction<Film>) => {
          if (
            action.payload.isFavorite &&
            !state.favorites.find((item) => item.id === action.payload.id)
          ) {
            state.favorites.push(action.payload);
          } else {
            state.favorites = state.favorites.filter(
              (item) => item.id !== action.payload.id
            );
          }
        }
      );
  },
});

export const favoritesReducer = favoritesSlice.reducer;
