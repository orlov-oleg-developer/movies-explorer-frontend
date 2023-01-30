import './Register.css'
import AuthForm from '../AuthForm/AuthForm'
import logoPath from "../../images/logo.svg";
import {Link} from "react-router-dom";

const Register = () => {
  return (
    <section className="register">
      <div className="register__title-container">
        <img className="register__logo" alt="Логотип" src={logoPath}/>
        <h2 className="register__title">Добро пожаловать!</h2>
      </div>
      <AuthForm buttonValue={'Зарегистрироваться'}>
        <label className="auth__form-field">
          Имя
          <input
            className="auth__input"
            type="string"
            name="form-name-input"
            required
          />
          <span className="auth__input-error mail-input-error"/>
        </label>
        <label className="auth__form-field">
          E-mail
          <input
            className="auth__input"
            type="email"
            name="form-mail-input"
            required
          />
          <span className="auth__input-error mail-input-error"/>
        </label>
        <label className="auth__form-field">
          Пароль
          <input
            className="auth__input"
            type="password"
            name="form-password-input"
            required
          />
          <span className="auth__input-error mail-input-error"/>
        </label>
      </AuthForm>
      <Link to="/signin" className="register__link">Уже зарегистрированы?
        <span className="register__link_bold">Войти</span>
      </Link>
    </section>
  );
};

export default Register;
