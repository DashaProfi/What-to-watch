import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FilmsList, Film, FilmId, FilmsState } from '../types/types';
import { ApiRoutes, BACKEND_URL } from '../const/const';
import { AxiosInstance } from 'axios';

export const getAllFilms = createAsyncThunk<
  FilmsList,
  undefined,
  { extra: AxiosInstance }
>('@@films-getAllFilms', async (_arg, { extra: api }) => {
  const { data: films } = await api.get<FilmsList>(
    `${BACKEND_URL}/${ApiRoutes.Films}`
  );
  return films;
});

export const getOneFilm = createAsyncThunk<
  Film,
  FilmId,
  { extra: AxiosInstance }
>('@@films-getOneFilm', async (filmId, { extra: api }) => {
  const { data: oneFilm } = await api.get<Film>(
    `${BACKEND_URL}/${ApiRoutes.Films}/${filmId}`
  );
  return oneFilm;
});

export const getSimilarFilms = createAsyncThunk<
  FilmsList,
  FilmId,
  { extra: AxiosInstance }
>('@@films-getSimilarFilms', async (filmId, { extra: api }) => {
  const { data: similarFilms } = await api.get<FilmsList>(
    `${BACKEND_URL}/${ApiRoutes.Films}/${filmId}/similar`
  );
  return similarFilms;
});

export const getPromoFilm = createAsyncThunk<
  Film,
  undefined,
  { extra: AxiosInstance }
>('@@films-getPromoFilms', async (_arg, { extra: api }) => {
  const { data: promoFilm } = await api.get<Film>(
    `${BACKEND_URL}/${ApiRoutes.Promo}`
  );
  return promoFilm;
});

const initialState: FilmsState = {
  allFilms: [],
  oneFilm: null,
  similarFilms: [],
  filmId: '',
  promoFilm: null,
  error: null,
  isLoading: false,
};

const filmsSlice = createSlice({
  name: '@@films',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllFilms.fulfilled,
        (state, action: PayloadAction<FilmsList>) => {
          state.allFilms = action.payload;
          state.error = null;
        }
      )
      .addCase(getAllFilms.rejected, (state) => {
        state.error = 'Что-то пошло не так!';
      })
      .addCase(getOneFilm.pending, (state) => {
        state.oneFilm = null;
        state.filmId = '';
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getOneFilm.fulfilled, (state, action: PayloadAction<Film>) => {
        state.oneFilm = action.payload;
        state.filmId = action.payload.id;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getOneFilm.rejected, (state) => {
        state.error = 'Фильм не найден';
      })
      .addCase(
        getSimilarFilms.fulfilled,
        (state, action: PayloadAction<FilmsList>) => {
          state.similarFilms = action.payload.filter(
            (film) => film.id !== state.filmId
          );
          state.error = null;
        }
      )
      .addCase(getSimilarFilms.rejected, (state) => {
        state.error = 'Фильм не найден';
      })
      .addCase(getPromoFilm.fulfilled, (state, action: PayloadAction<Film>) => {
        state.promoFilm = action.payload;
        state.filmId = action.payload.id;
        state.oneFilm = action.payload;
      });
  },
});

const { actions, reducer } = filmsSlice;
export const filmsReducer = reducer;
