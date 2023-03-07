import { URL } from '../../config/config'
import {Dispatch} from "redux";
import {UserAction, UserActionTypes} from "../../types/user";

interface ProfileData {
  name: string;
  email: string;
}

const token = localStorage.getItem('jwt');

export const getUserInfo = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({type: UserActionTypes.FETCH_USER})
      const response = await fetch(`${URL}/users/me`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
          }
        })
      const user = await response.json();
      dispatch({type: UserActionTypes.FETCH_USER_SUCCESS, payload: user})
    } catch (e: any) {
      const errorMessage = await e.json();
      dispatch({
        type: UserActionTypes.FETCH_USER_ERROR,
        payload: errorMessage
      })
    }
  }
}

export const updateUserInfo = (profileData: ProfileData) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({type: UserActionTypes.FETCH_USER})
      const response = await fetch(`${URL}/users/me`,
        {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
          },
          body: JSON.stringify({
            name: profileData.name,
            email: profileData.email,
          })
        })
      const user = await response.json();
      dispatch({type: UserActionTypes.FETCH_USER_SUCCESS, payload: user})
    } catch (e: any) {
      const errorMessage = await e.json();
      dispatch({
        type: UserActionTypes.FETCH_USER_ERROR,
        payload: errorMessage
      })
    }
  }
}
