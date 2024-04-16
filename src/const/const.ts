import Player from '../pages/player/player';
export const FILMS_LIMIT = 8;
export const GENRES_LIMIT = 9;

export const MIN_LENGTH = 50;
export const MAX_LENGTH = 400;

export enum AppRoutes {
  Main = '/',
  SignIn = '/login',
  Favorites = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum AuthorizationStatus {
  AUTH = 'auth',
  NO_AUTH = 'noAuth',
  UNKNOWN = 'unknown',
}

export const BACKEND_URL = 'https://15.design.htmlacademy.pro/wtw';
export const REQUEST_TIMEOUT = 5000;

export enum ApiRoutes {
  Films = 'films',
  Promo = 'promo',
  Favorite = 'favorite',
  Comments = 'comments',
  Login = 'login',
  Logout = 'logout',
  Player = 'player',
}

export const Ratings = ['5', '4', '3', '2', '1'];
