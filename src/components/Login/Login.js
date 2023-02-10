import './Login.css'
import logoPath from "../../images/logo.svg";
import AuthForm from "../AuthForm/AuthForm";
import { Link } from "react-router-dom";
import useInput from "../../hooks/useInput";
import {useEffect, useState} from "react";

const Login = ({ onLogin, errorMessage }) => {
  const [ isInputsValid, setIsInputsValid ] = useState(false);

  const mailInput = useInput(
    '',
    {
      minLength: 2,
      maxLength: 40,
      isEmpty: true,
      isEmail: true,
    })
  const passwordInput = useInput(
    '',
    {
      minLength: 8,
      isEmpty: true,
    })

  const handleSubmit = () => {
    onLogin({ mailInput, passwordInput });
  }

  useEffect(() => {
    if (mailInput.isInputValid && passwordInput.isInputValid) {
      setIsInputsValid(true);
    } else setIsInputsValid(false);
  }, [mailInput, passwordInput]);

  return (
    <section className="login">
      <div className="login__title-container">
        <img className="login__logo" alt="Логотип" src={logoPath}/>
        <h2 className="login__title">Рады видеть!</h2>
      </div>
      <AuthForm
        buttonValue={'Войти'}
        onSubmit={handleSubmit}
        isInputsValid={isInputsValid}
        error={errorMessage}
      >
        <label className="auth-form__field">
          E-mail
          <input
            className="auth-form__input"
            type="email"
            name="form-mail-input"
            value={mailInput.value}
            onChange={(event) => mailInput.onChange(event)}
            onBlur={() => mailInput.onBlur()}
          />
          {(mailInput.isDirty && mailInput.isEmpty.state) &&
            <span className="auth-form__input-error">{mailInput.isEmpty.errorMessage}</span>
          }
          {(mailInput.isDirty && mailInput.minLengthError.state) &&
            <span className="auth-form__input-error">{mailInput.minLengthError.errorMessage}</span>
          }
          {(mailInput.isDirty && mailInput.maxLengthError.state) &&
            <span className="auth-form__input-error">{mailInput.maxLengthError.errorMessage}</span>
          }
          {(mailInput.isDirty && mailInput.isEmailError.state) &&
            <span className="auth-form__input-error">{mailInput.isEmailError.errorMessage}</span>
          }
        </label>
        <label className="auth-form__field">
          Пароль
          <input
            className="auth-form__input"
            type="password"
            name="form-password-input"
            value={passwordInput.value}
            onChange={(event) => passwordInput.onChange(event)}
            onBlur={() => passwordInput.onBlur()}
          />
          {(passwordInput.isDirty && passwordInput.isEmpty.state) &&
            <span className="auth-form__input-error">{passwordInput.isEmpty.errorMessage}</span>
          }
          {(passwordInput.isDirty && passwordInput.minLengthError.state) &&
            <span className="auth-form__input-error">{passwordInput.minLengthError.errorMessage}</span>
          }
        </label>
      </AuthForm>
      <Link to="/signup" className="login__link">Ещё не зарегистрированы?
        <span className="login__link_bold">Регистрация</span>
      </Link>
    </section>
  );
};

export default Login;
