import { URL } from '../../config/config'
import { Dispatch } from "redux";
import { ISavedMovie, SavedMoviesAction, SavedMoviesActionTypes } from "../../types/savedMovies";
import { IUser } from '../../types/user';

export const getSavedMovies = (token: string, user: IUser) => {
  console.log(`Token is`, token)
  return async (dispatch: Dispatch<SavedMoviesAction>) => {
    try {
      dispatch({ type: SavedMoviesActionTypes.FETCH_SAVED_MOVIES })
      const response = await fetch(`${URL}/movies`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          }
        })
      if (response.ok) {
        const movies = await response.json();
        const filteredMovies = movies.filter((movie: ISavedMovie) => movie.owner._id === user._id)
        dispatch({ type: SavedMoviesActionTypes.FETCH_SAVED_MOVIES_SUCCESS, payload: filteredMovies });
      } else await Promise.reject(response);
    } catch (e: any) {
      const errorMessage = await e.json();
      dispatch({
        type: SavedMoviesActionTypes.FETCH_SAVED_MOVIES_ERROR,
        payload: errorMessage.message
      })
    }
  }
}

export const addSavedMovies = (movieData: ISavedMovie, token: string) => {
  return async (dispatch: Dispatch<SavedMoviesAction>) => {
    try {
      dispatch({ type: SavedMoviesActionTypes.FETCH_SAVED_MOVIES })
      const response = await fetch(`${URL}/movies`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(movieData),
        })
      const movie = await response.json();
      dispatch({ type: SavedMoviesActionTypes.ADD_SAVED_MOVIE, payload: movie });
    } catch (e: any) {
      const errorMessage = await e.json();
      dispatch({
        type: SavedMoviesActionTypes.FETCH_SAVED_MOVIES_ERROR,
        payload: errorMessage
      })
    }
  }
}

export const deleteSavedMovies = (movieID: string, token: string) => {
  return async (dispatch: Dispatch<SavedMoviesAction>) => {
    try {
      dispatch({ type: SavedMoviesActionTypes.FETCH_SAVED_MOVIES })
      const response = await fetch(`${URL}/movies/${movieID}`,
        {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          }
        })
      const movies = await response.json();
      dispatch({ type: SavedMoviesActionTypes.DELETE_SAVED_MOVIE, payload: movies });
    } catch (e: any) {
      const errorMessage = await e.json();
      dispatch({
        type: SavedMoviesActionTypes.FETCH_SAVED_MOVIES_ERROR,
        payload: errorMessage
      })
    }
  }
}
