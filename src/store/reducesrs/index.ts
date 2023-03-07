import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { tokenReducer } from "./tokenReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
})

export type RootState = ReturnType<typeof rootReducer>
