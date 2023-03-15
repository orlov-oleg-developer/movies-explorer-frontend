import './Register.css'
import React, {FC} from 'react';
import logoPath from "../../images/logo.svg";
import AuthForm from '../AuthForm/AuthForm'
import { Link } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { useEffect, useState } from "react";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const Register: FC = () => {
  const { register, authorize } = useActions();

  const { user, error, loading } = useTypedSelector(state => state.user);
  const [ isInputsValid, setIsInputsValid ] = useState(false);

  const nameInput = useInput(
    '',
    {
      minLength: 2,
      maxLength: 30,
      isEmpty: true,
      isName: true,
    })
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
    await register({ nameInput: nameInput.value, mailInput: mailInput.value, passwordInput: passwordInput.value });
  }

  useEffect(() => {
    if (nameInput.isInputValid && mailInput.isInputValid && passwordInput.isInputValid) {
      setIsInputsValid(true);
    } else setIsInputsValid(false);
  }, [nameInput, mailInput, passwordInput]);

  useEffect(() => {
    if (user.name) {
      authorize({ mailInput: mailInput.value, passwordInput: passwordInput.value })
    }
  }, [ user ])

  return (
    <section className="register">
      <div className="register__title-container">
        <Link to="/"><img className="register__logo" alt="Логотип" src={logoPath}/></Link>
        <h2 className="register__title">Добро пожаловать!</h2>
      </div>
      <AuthForm
        loading={loading}
        buttonValue={'Зарегистрироваться'}
        onSubmit={handleSubmit}
        isInputsValid={isInputsValid}
        error={error}
      >
        <label className="auth-form__field">
          Имя
          <input
            className="auth-form__input"
            type="string"
            name="form-name-input"
            value={nameInput.value}
            onChange={(event) => nameInput.onChange(event.target.value)}
            onBlur={() => nameInput.onBlur()}
          />
          {(nameInput.isDirty && nameInput.isEmpty.state) &&
            <span className="auth-form__input-error">{nameInput.isEmpty.errorMessage}</span>
          }
          {(nameInput.isDirty && nameInput.minLengthError.state) &&
            <span className="auth-form__input-error">{nameInput.minLengthError.errorMessage}</span>
          }
          {(nameInput.isDirty && nameInput.maxLengthError.state) &&
            <span className="auth-form__input-error">{nameInput.maxLengthError.errorMessage}</span>
          }
          {(nameInput.isDirty && nameInput.isNameError.state) &&
            <span className="auth-form__input-error">{mailInput.isNameError.errorMessage}</span>
          }
        </label>
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
      <Link to="/signin" className="register__link">Уже зарегистрированы?
        <span className="register__link_bold">Войти</span>
      </Link>
    </section>
  );
};

export default Register;
