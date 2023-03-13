import { URL } from '../../config/config'
import {Dispatch} from "redux";
import {TokenAction, TokenActionTypes} from "../../types/token";

interface AuthorizeProps {
  mailInput: string,
  passwordInput: string,
}

interface RegisterProps {
  nameInput: string,
  mailInput: string,
  passwordInput: string,
}

export const authorize = ({ mailInput, passwordInput }: AuthorizeProps) => {
  return async (dispatch: Dispatch<TokenAction>) => {
    try {
      dispatch({type: TokenActionTypes.FETCH_TOKEN})
      const tokenData = await fetch(`${URL}/signin`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: mailInput,
          password: passwordInput,
        })
      })
      const token = await tokenData.json();
      if (token) {
        localStorage.setItem('jwt', token.token);
        dispatch({type: TokenActionTypes.FETCH_TOKEN_SUCCESS, payload: token})
      }
    }
    catch (e: any) {
      const errorMessage = await e.json();
      dispatch({
        type: TokenActionTypes.FETCH_TOKEN_ERROR,
        payload: errorMessage
      })
    }
  }
}

export const register = ({ mailInput, passwordInput, nameInput }: RegisterProps) => {
  return async (dispatch: Dispatch<TokenAction>) => {
    try {
      dispatch({type: TokenActionTypes.FETCH_TOKEN})
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
      res.ok
        ? dispatch({
            type: TokenActionTypes.FETCH_TOKEN_SUCCESS,
            payload: await res.json()
          })
        : await Promise.reject(res)
    }
    catch (e: any) {
      const errorMessage = await e.json();
      dispatch({
        type: TokenActionTypes.FETCH_TOKEN_ERROR,
        payload: errorMessage.message
      })
      return errorMessage;
    }
  }
}
