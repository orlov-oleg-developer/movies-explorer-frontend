import { SavedMoviesAction, SavedMoviesActionTypes, SavedMoviesState } from '../../types/savedMovies'

const initialState: SavedMoviesState = {
  savedMovies: [],
  loading: false,
  error: null
}

export const savedMoviesReducer = (state: SavedMoviesState = initialState, action: SavedMoviesAction): SavedMoviesState => {
  switch (action.type) {
    case SavedMoviesActionTypes.FETCH_SAVED_MOVIES:
      return {...state, loading: true, error: null}
    case SavedMoviesActionTypes.FETCH_SAVED_MOVIES_SUCCESS:
      return {loading: false, error: null, savedMovies: action.payload}
    case SavedMoviesActionTypes.FETCH_SAVED_MOVIES_ERROR:
      return {...state, loading: false, error: action.payload}
    case SavedMoviesActionTypes.ADD_SAVED_MOVIE:
      return {loading: false, error: null, savedMovies: [...state.savedMovies, action.payload]}
    case SavedMoviesActionTypes.DELETE_SAVED_MOVIE:
      return {loading: false, error: null, savedMovies: state.savedMovies.filter(savedMovie => savedMovie.movieId !== action.payload.movieId)}
    default:
      return state
  }
}
