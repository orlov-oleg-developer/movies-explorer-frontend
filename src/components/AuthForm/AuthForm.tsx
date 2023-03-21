import './AuthForm.css'
import React, { FC } from 'react';

interface AuthFormProps {
  buttonValue: string;
  children: any;
  onSubmit: () => void;
  isInputsValid: boolean;
  error: string | null;
  loading: boolean;
}

const AuthForm: FC<AuthFormProps> = ({ buttonValue, children, onSubmit, isInputsValid, error, loading }) => {
  return (
    <form
      className="auth-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="auth-form__fields">
        {children}
        {error && <p className="auth-form__input-error">{error}</p>}
      </div>
      <button
        disabled={!isInputsValid && loading}
        type="submit"
        className={`auth-form__submit ${isInputsValid && "auth-form__submit_active"}`}
        name="form-submit"
      >{buttonValue}</button>
    </form>
  );
};

export default AuthForm;
