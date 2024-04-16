import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiRoutes, AuthorizationStatus, BACKEND_URL } from '../const/const';
import { UserAuthorizationData, UserInfo } from '../types/types';
import { AxiosInstance } from 'axios';
import { dropToken, setToken, Token } from '../services/token';

export const getUserInfo = createAsyncThunk<
  UserInfo,
  undefined,
  { extra: AxiosInstance }
>('@@user-getUserInfo', async (_arg, { extra: api }) => {
  const { data: userInfo } = await api.get<UserInfo>(
    `${BACKEND_URL}/${ApiRoutes.Login}`
  );
  return userInfo;
});

export const setUserLogin = createAsyncThunk<
  UserInfo,
  UserAuthorizationData,
  { extra: AxiosInstance }
>('@@user-setUserData', async (userData, { extra: api }) => {
  const { data } = await api.post<UserInfo>(
    `${BACKEND_URL}/${ApiRoutes.Login}`,
    userData
  );
  return data;
});

export const logoutUser = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>('@@user-logoutUser', async (_arg, { extra: api }) => {
  await api.delete<Token>(`${BACKEND_URL}/${ApiRoutes.Logout}`);
});

const initialState: UserInfo = {
  avatarUrl: '',
  email: '',
  id: 0,
  name: '',
  token: '',
  authorizationStatus: AuthorizationStatus.UNKNOWN,
};

const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getUserInfo.fulfilled,
        (state, action: PayloadAction<UserInfo>) => {
          state.avatarUrl = action.payload.avatarUrl;
          state.email = action.payload.email;
          state.id = action.payload.id;
          state.name = action.payload.name;
          state.token = action.payload.token;
          state.authorizationStatus = AuthorizationStatus.AUTH;
        }
      )
      .addCase(getUserInfo.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      })
      .addCase(
        setUserLogin.fulfilled,
        (state, action: PayloadAction<UserInfo>) => {
          state.avatarUrl = action.payload.avatarUrl;
          state.email = action.payload.avatarUrl;
          state.id = action.payload.id;
          state.name = action.payload.name;
          state.token = action.payload.token;
          state.authorizationStatus = AuthorizationStatus.AUTH;
          setToken(action.payload.token);
        }
      )
      .addCase(logoutUser.pending, (state) => {
        dropToken();
        state.token = '';
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      });
  },
});

export const userReducer = userSlice.reducer;
