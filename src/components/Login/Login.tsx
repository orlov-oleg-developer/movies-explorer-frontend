import './Login.css'
import React, { FC, useEffect, useState } from 'react';
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import logoPath from "../../images/logo.svg";
import useInput from "../../hooks/useInput";

const Login: FC = () => {
  const { authorize } = useActions();

  const { token, error, loading } = useTypedSelector(state => state.token);
  const [isInputsValid, setIsInputsValid] = useState(false);

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

  const handleSubmit = async () => {
    await authorize({ mailInput: mailInput.value, passwordInput: passwordInput.value });
  }

  useEffect(() => {
    if (mailInput.isInputValid && passwordInput.isInputValid) {
      setIsInputsValid(true);
    } else setIsInputsValid(false);
  }, [mailInput, passwordInput]);

  return (
    <section className="login">
      <div className="login__title-container">
        <Link to="/"><img className="login__logo" alt="Логотип" src={logoPath} /></Link>
        <h2 className="login__title">Рады видеть!</h2>
      </div>
      <AuthForm
        loading={loading}
        buttonValue={'Войти'}
        onSubmit={handleSubmit}
        isInputsValid={isInputsValid}
        error={error}
      >
        <label className="auth-form__field">
          E-mail
          <input
            className="auth-form__input"
            type="email"
            name="form-mail-input"
            value={mailInput.value}
            onChange={(event) => mailInput.onChange(event.target.value)}
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
            onChange={(event) => passwordInput.onChange(event.target.value)}
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
