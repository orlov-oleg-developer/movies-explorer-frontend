import { MoviesAction, MoviesActionTypes, MoviesState } from '../../types/movies'

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null
}

export const moviesReducer = (state: MoviesState = initialState, action: MoviesAction): MoviesState => {
  switch (action.type) {
    case MoviesActionTypes.FETCH_MOVIES:
      return {...state, loading: true, error: null}
    case MoviesActionTypes.FETCH_MOVIES_SUCCESS:
      return {loading: false, error: null, movies: action.payload}
    case MoviesActionTypes.FETCH_MOVIES_ERROR:
      return {...state, loading: false, error: action.payload}
    case MoviesActionTypes.SET_MOVIES:
      return {loading: false, error: null, movies: action.payload}
    default:
      return state
  }
}
