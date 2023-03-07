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
      localStorage.setItem('jwt', token.token);
      dispatch({type: TokenActionTypes.FETCH_TOKEN_SUCCESS, payload: token})
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
