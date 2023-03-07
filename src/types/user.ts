export interface IUser {
  _id: string;
  email: string;
  name: string;
}

export interface UserState {
  user: IUser;
  loading: boolean;
  error: null | string;
}

export enum UserActionTypes {
  FETCH_USER = "FETCH_USER",
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_ERROR = 'FETCH_USER_ERROR'
}

interface FetchUserAction {
  type: UserActionTypes.FETCH_USER;
}

interface FetchUserSuccessAction {
  type: UserActionTypes.FETCH_USER_SUCCESS
  payload: IUser;
}

interface FetchUserErrorAction {
  type: UserActionTypes.FETCH_USER_ERROR;
  payload: string;
}

export type UserAction = FetchUserAction | FetchUserSuccessAction | FetchUserErrorAction
