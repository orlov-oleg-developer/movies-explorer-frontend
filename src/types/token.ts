export interface TokenState {
  token: string;
  loading: boolean;
  error: null | string;
}

export enum TokenActionTypes {
  FETCH_TOKEN = "FETCH_TOKEN",
  FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS',
  FETCH_TOKEN_ERROR = 'FETCH_TOKEN_ERROR'
}

interface FetchTokenAction {
  type: TokenActionTypes.FETCH_TOKEN;
}

interface FetchTokenSuccessAction {
  type: TokenActionTypes.FETCH_TOKEN_SUCCESS
  payload: string;
}

interface FetchTokenErrorAction {
  type: TokenActionTypes.FETCH_TOKEN_ERROR
  payload: string;
}

export type TokenAction = FetchTokenAction | FetchTokenSuccessAction | FetchTokenErrorAction
