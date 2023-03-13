import { UserAction, UserActionTypes, UserState } from "../../types/user";

const initialState: UserState = {
  user: {
    _id: '',
    email: '',
    name: '',
  },
  loading: false,
  error: null
}

export const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER:
      return {...state, loading: true, error: null}
    case UserActionTypes.FETCH_USER_SUCCESS:
      return {loading: false, error: null, user: action.payload}
    case UserActionTypes.FETCH_USER_ERROR:
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}
