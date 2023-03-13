import { Dispatch } from "redux";
import { MoviesAction, MoviesActionTypes } from "../../types/movies";

const URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const getMovies = () => {
  return async (dispatch: Dispatch<MoviesAction>) => {
    try {
      dispatch({type: MoviesActionTypes.FETCH_MOVIES})
      const response = await fetch(`${URL}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
      const movies = await response.json();
      dispatch({type: MoviesActionTypes.FETCH_MOVIES_SUCCESS, payload: movies});
      localStorage.setItem('movies', JSON.stringify(movies));
    } catch (e: any) {
      const errorMessage = await e.json();
      dispatch({
        type: MoviesActionTypes.FETCH_MOVIES_ERROR,
        payload: errorMessage
      })
    }
  }
}

export const setMovies = (movies: []): MoviesAction => {
  return {type: MoviesActionTypes.SET_MOVIES, payload: movies}
}
