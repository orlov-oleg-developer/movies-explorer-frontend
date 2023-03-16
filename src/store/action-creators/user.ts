import { URL } from '../../config/config'
import { Dispatch } from "redux";
import { UserAction, UserActionTypes } from "../../types/user";

interface ProfileData {
  name: string;
  email: string;
}

interface RegisterProps {
  nameInput: string,
  mailInput: string,
  passwordInput: string,
}

const jwt = localStorage.getItem('jwt');

export const register = ({ mailInput, passwordInput, nameInput }: RegisterProps) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.FETCH_USER })
      const res = await fetch(`${URL}/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nameInput,
          email: mailInput,
          password: passwordInput,
        })
      })
      if (res.ok) {
        const userInfo = await res.json();
        dispatch({
          type: UserActionTypes.SET_USER,
          payload: {
            _id: userInfo.user._id,
            name: userInfo.user.name,
            email: userInfo.user.email
          }
        })
      } else await Promise.reject(res)
    }
    catch (e: any) {
      const errorMessage = await e.json();
      dispatch({
        type: UserActionTypes.FETCH_USER_ERROR,
        payload: errorMessage.message
      })
    }
  }
}

export const getUserInfo = (jwt: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.FETCH_USER })
      const res = await fetch(`${URL}/users/me`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${jwt}`
          }
        })
      if (res.ok) {
        const user = await res.json();
        dispatch({ type: UserActionTypes.FETCH_USER_SUCCESS, payload: user })
      } else await Promise.reject(res)
    } catch (e: any) {
      const errorMessage = await e.json();
      dispatch({
        type: UserActionTypes.FETCH_USER_ERROR,
        payload: errorMessage.message
      })
    }
  }
}

export const updateUserInfo = (profileData: ProfileData) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.FETCH_USER })
      const response = await fetch(`${URL}/users/me`,
        {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${jwt}`
          },
          body: JSON.stringify({
            name: profileData.name,
            email: profileData.email,
          })
        })
      const user = await response.json();
      dispatch({ type: UserActionTypes.FETCH_USER_SUCCESS, payload: user })
    } catch (e: any) {
      const errorMessage = await e.json();
      dispatch({
        type: UserActionTypes.FETCH_USER_ERROR,
        payload: errorMessage
      })
    }
  }
}

export const setUser = (profileData: ProfileData) => {
  return { type: UserActionTypes.SET_USER, payload: profileData }
}
