import { URL } from '../../config/config'
import {Dispatch} from "redux";
import {TokenAction, TokenActionTypes} from "../../types/token";

interface AuthorizeProps {
  mailInput: string,
  passwordInput: string,
}

export const authorize = ({ mailInput, passwordInput }: AuthorizeProps) => {
  return async (dispatch: Dispatch<TokenAction>) => {
    try {
      dispatch({type: TokenActionTypes.FETCH_TOKEN})
      const res = await fetch(`${URL}/signin`, {
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
      if (res.ok) {
        const token = await res.json();
        localStorage.setItem('jwt', token.token);
        dispatch({type: TokenActionTypes.FETCH_TOKEN_SUCCESS, payload: token.token})
      } else await Promise.reject(res)
    }
    catch (e: any) {
      const errorMessage = await e.json();
      dispatch({
        type: TokenActionTypes.FETCH_TOKEN_ERROR,
        payload: errorMessage.message
      })
    }
  }
}

export const setToken = (token: string) => {
  return {type: TokenActionTypes.SET_TOKEN, payload: token}
}
