import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { tokenReducer } from "./tokenReducer";
import { moviesReducer } from "./moviesReducer";
import { savedMoviesReducer } from "./savedMoviesReducer";
import { cardsTotalCountReducer } from "./cardsTotalcCountReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
  movies: moviesReducer,
  savedMovies: savedMoviesReducer,
  cardsTotalCount: cardsTotalCountReducer,
})

export type RootState = ReturnType<typeof rootReducer>
