import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { tokenReducer } from "./tokenReducer";
import {moviesReducer} from "./moviesReducer";
import {savedMoviesReducer} from "./savedMoviesReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
  movies: moviesReducer,
  savedMovies: savedMoviesReducer,
})

export type RootState = ReturnType<typeof rootReducer>
