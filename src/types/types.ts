import { AuthorizationStatus } from '../const/const';
import { Token } from '../services/token';

export interface Film {
  id: string;
  name: string;
  posterImage: string;
  previewImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  previewVideoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: string;
  isFavorite: boolean;
}

export type FilmsList = Film[];

export interface FilmsState {
  allFilms: FilmsList;
  oneFilm: Film | null;
  similarFilms: FilmsList;
  filmId: FilmId;
  promoFilm: Film | null;
  error: any;
  isLoading: boolean;
}

export type FilmId = string;

export interface Comment {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
  };
}

export type Comments = Comment[];

export interface UserComment {
  comment: string;
  rating: number;
}

export interface CommentsState {
  comments: Comments;
  errorMessage: string;
  sendStatus: SendStatus;
}

export enum SendStatus {
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
  Unknown = 'unknown',
}

export interface UserInfo {
  avatarUrl: string;
  email: string;
  id: number;
  name: string;
  token: Token;
  authorizationStatus: AuthorizationStatus;
}

export interface UserAuthorizationData {
  email: string;
  password: string;
}

export interface FavoritesState {
  favorites: FilmsList;
}
