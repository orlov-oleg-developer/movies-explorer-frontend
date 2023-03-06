import { combineReducers } from "redux";
import {isLoggedInReducer} from "./isLoggedInReducer";

export const rootReducer = combineReducers({
  isLoggedIn: isLoggedInReducer,
})

export type RootState = ReturnType<typeof rootReducer>
