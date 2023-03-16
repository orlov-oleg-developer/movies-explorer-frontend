export interface ISavedMovie {
  _id?: string,
  country: string,
  director: string,
  duration: number,
  year: string,
  description: string,
  image: string,
  trailerLink: string,
  thumbnail: string,
  owner?: any,
  movieId: string,
  nameRU: string,
  nameEN: string,
}

export interface SavedMoviesState {
  savedMovies: ISavedMovie[];
  loading: boolean;
  error: null | string;
}

export enum SavedMoviesActionTypes {
  FETCH_SAVED_MOVIES = "FETCH_SAVED_MOVIES",
  FETCH_SAVED_MOVIES_SUCCESS = 'FETCH_SAVED_MOVIES_SUCCESS',
  FETCH_SAVED_MOVIES_ERROR = 'FETCH_SAVED_MOVIES_ERROR',
  ADD_SAVED_MOVIE = "ADD_SAVED_MOVIE",
  DELETE_SAVED_MOVIE = "DELETE_SAVED_MOVIES_SAVED_MOVIE",
}

interface FetchSavedMoviesAction {
  type: SavedMoviesActionTypes.FETCH_SAVED_MOVIES;
}

interface FetchSavedMoviesSuccessAction {
  type: SavedMoviesActionTypes.FETCH_SAVED_MOVIES_SUCCESS
  payload: ISavedMovie[];
}

interface FetchSavedMoviesErrorAction {
  type: SavedMoviesActionTypes.FETCH_SAVED_MOVIES_ERROR
  payload: string;
}

interface AddSavedMovie {
  type: SavedMoviesActionTypes.ADD_SAVED_MOVIE
  payload: ISavedMovie;
}

interface DeleteSavedMovie {
  type: SavedMoviesActionTypes.DELETE_SAVED_MOVIE
  payload: ISavedMovie;
}

export type SavedMoviesAction =
  FetchSavedMoviesAction
  | FetchSavedMoviesSuccessAction
  | FetchSavedMoviesErrorAction
  | AddSavedMovie
  | DeleteSavedMovie
