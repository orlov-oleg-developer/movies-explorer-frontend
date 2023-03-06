import thunk from "redux-thunk";
import { rootReducer } from "./reducesrs/index"
import { applyMiddleware, legacy_createStore as createStore } from "redux";

export const store = createStore(rootReducer, applyMiddleware(thunk))
