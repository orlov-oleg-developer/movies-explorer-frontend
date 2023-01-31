import './AuthForm.css'

export function AuthForm({ buttonValue, children }) {
  return (
    <form className="auth-form">
      <div className="auth-form__fields">
        {children}
      </div>
      <input type="submit" className="auth-form__submit" name="form-submit" value={buttonValue}/>
    </form>
  )
}

export default AuthForm;
