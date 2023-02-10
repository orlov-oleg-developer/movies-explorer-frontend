import './AuthForm.css'

export function AuthForm({ buttonValue, children, onSubmit, isInputsValid, error }) {
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
      </div>
      {error && <p className="auth-form__input-error">{error}</p>}
      <button
        disabled={isInputsValid ? false : true}
        type="submit"
        className={`auth-form__submit ${isInputsValid && "auth-form__submit_active"}`}
        name="form-submit"
      >{buttonValue}</button>
    </form>
  )
}

export default AuthForm;
