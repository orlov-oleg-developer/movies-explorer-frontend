import './AuthForm.css'

export function AuthForm({ buttonValue, children }) {
  return (
    <form className="auth__form">
      <div className="auth__form__fields">
        {children}
      </div>
      <input type="submit" className="auth__submit" name="form-submit" value={buttonValue}/>
    </form>
  )
}

export default AuthForm;
