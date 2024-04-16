import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  Comments,
  CommentsState,
  FilmId,
  SendStatus,
  UserComment,
} from '../types/types';
import { ApiRoutes, BACKEND_URL } from '../const/const';
import { AxiosInstance } from 'axios';
import { AppState } from '../types/store';
import { stat } from 'fs/promises';

export const getComments = createAsyncThunk<
  Comments,
  FilmId,
  { extra: AxiosInstance }
>('@@comments-getComments', async (filmId, { extra: api }) => {
  const { data: comments } = await api.get<Comments>(
    `${BACKEND_URL}/${ApiRoutes.Comments}/${filmId}`
  );
  return comments;
});

export const postComment = createAsyncThunk<
  Comments,
  UserComment,
  { extra: AxiosInstance; rejectValue: string }
>(
  '@@comments-postComment',
  async (userComment, { extra: api, getState, rejectWithValue }) => {
    const { films } = getState() as AppState;
    try {
      const response = await api.post<Comments>(
        `${BACKEND_URL}/${ApiRoutes.Comments}/${films.filmId}`,
        userComment
      );
      const comments = response.data;
      return comments;
    } catch (err: any) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

const initialState: CommentsState = {
  comments: [],
  errorMessage: ' ',
  sendStatus: SendStatus.Unknown,
};

const commentsSlice = createSlice({
  name: '@@comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getComments.fulfilled,
        (state, action: PayloadAction<Comments>) => {
          state.comments = action.payload;
          state.errorMessage = ' ';
        }
      )
      .addCase(
        postComment.fulfilled,
        (state, action: PayloadAction<Comments>) => {
          state.comments = action.payload;
          state.errorMessage = ' ';
          state.sendStatus = SendStatus.Fulfilled;
        }
      )
      .addCase(postComment.pending, (state) => {
        state.sendStatus = SendStatus.Pending;
      })
      .addCase(postComment.rejected, (state, action: PayloadAction<any>) => {
        state.errorMessage = action.payload;
        state.sendStatus = SendStatus.Rejected;
      });
  },
});

const { actions, reducer } = commentsSlice;
export const commentsReducer = reducer;
