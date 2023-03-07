import {TokenAction, TokenActionTypes, TokenState} from "../../types/token";

const initialState: TokenState = {
  token: '',
  loading: false,
  error: null
}

export const tokenReducer = (state: TokenState = initialState, action: TokenAction): TokenState => {
  switch (action.type) {
    case TokenActionTypes.FETCH_TOKEN:
      return {...state, loading: true, error: null}
    case TokenActionTypes.FETCH_TOKEN_SUCCESS:
      return {loading: false, error: null, token: action.payload}
    case TokenActionTypes.FETCH_TOKEN_ERROR:
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}
