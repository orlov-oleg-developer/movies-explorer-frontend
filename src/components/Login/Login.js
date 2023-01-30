import './Login.css'
import logoPath from "../../images/logo.svg";
import AuthForm from "../AuthForm/AuthForm";
import {Link} from "react-router-dom";

const Login = () => {
  return (
    <section className="login">
      <div className="login__title-container">
        <img className="login__logo" alt="Логотип" src={logoPath}/>
        <h2 className="login__title">Рады видеть!</h2>
      </div>
      <AuthForm buttonValue={'Зарегистрироваться'}>
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
      <Link to="/signup" className="login__link">Ещё не зарегистрированы?
        <span className="login__link_bold">Регистрация</span>
      </Link>
    </section>
  );
};

export default Login;
