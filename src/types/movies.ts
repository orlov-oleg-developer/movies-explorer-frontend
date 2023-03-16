export interface IMovie {
  id: number,
  country: string,
  director: string,
  duration: number,
  created_at: string,
  description: string,
  image: any,
  nameRU: string,
  nameEN: string,
  trailerLink: string,
  owner?: string
  _id?: string,
}

export interface MoviesState {
  movies: IMovie[];
  loading: boolean;
  error: null | string;
}

export enum MoviesActionTypes {
  FETCH_MOVIES = "FETCH_MOVIES",
  FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS',
  FETCH_MOVIES_ERROR = 'FETCH_MOVIES_ERROR',
  SET_MOVIES = "SET_MOVIES",
}

interface FetchMoviesAction {
  type: MoviesActionTypes.FETCH_MOVIES;
}

interface FetchMoviesSuccessAction {
  type: MoviesActionTypes.FETCH_MOVIES_SUCCESS
  payload: [];
}

interface FetchMoviesErrorAction {
  type: MoviesActionTypes.FETCH_MOVIES_ERROR
  payload: string;
}

interface SetMovies {
  type: MoviesActionTypes.SET_MOVIES
  payload: [];
}

export type MoviesAction = FetchMoviesAction | FetchMoviesSuccessAction | FetchMoviesErrorAction | SetMovies
