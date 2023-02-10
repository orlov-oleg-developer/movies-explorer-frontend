import './Profile.css'
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'
import { useState, useEffect, useContext } from "react";
import useInput from "../../hooks/useInput";

const Profile = ({ handleLogout, handleUpdateUserInfo }) => {
  const currentUser = useContext(CurrentUserContext);

  const [ isInputsValid, setIsInputsValid ] = useState(false);
  const [ isNewData, setIsNewData ] = useState(false);

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

  const checkData = (name, email) => {
    if(name === nameInput.value && email === mailInput.value) {
      setIsNewData(false);
    } else setIsNewData(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if(!isNewData) return;
    {isInputsValid &&
      handleUpdateUserInfo({
        name: nameInput.value,
        email: mailInput.value,
      })
    };
  }

  useEffect(() => {
    nameInput.onChange({target:{value: currentUser.name}});
    mailInput.onChange({target:{value: currentUser.email}});
  }, [])

  useEffect(() => {
    if (nameInput.isInputValid && mailInput.isInputValid) {
      setIsInputsValid(true);
    } else setIsInputsValid(false);
    checkData(currentUser.name, currentUser.email);
  }, [nameInput, mailInput]);

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form
        className="profile__form"
        onSubmit={handleSubmit}
      >
        <div className="profile__form-label-container">
          <p className="profile__form-label">Имя</p>
          <label className="profile__form-field">
            <input
              className={`profile__input`}
              type="string"
              name="form-name-input"
              value={nameInput.value}
              onChange={(event) => nameInput.onChange(event)}
              onBlur={() => nameInput.onBlur()}
            />
            {(nameInput.isDirty && nameInput.isEmpty.state) &&
              <span className="profile__input-error">{nameInput.isEmpty.errorMessage}</span>
            }
            {(nameInput.isDirty && nameInput.minLengthError.state) &&
              <span className="profile__input-error">{nameInput.minLengthError.errorMessage}</span>
            }
            {(nameInput.isDirty && nameInput.maxLengthError.state) &&
              <span className="profile__input-error">{nameInput.maxLengthError.errorMessage}</span>
            }
            {(nameInput.isDirty && nameInput.isNameError.state) &&
              <span className="profile__input-error">{mailInput.isNameError.errorMessage}</span>
            }
          </label>
        </div>
        <div className="profile__form-label-container">
          <p className="profile__form-label">Email</p>
          <label className="profile__form-field">
            <input
              className={`profile__input`}
              type="email"
              name="form-mail-input"
              value={mailInput.value}
              onChange={(event) => mailInput.onChange(event)}
              onBlur={() => mailInput.onBlur()}
            />
            {(mailInput.isDirty && mailInput.isEmpty.state) &&
              <span className="profile__input-error">{mailInput.isEmpty.errorMessage}</span>
            }
            {(mailInput.isDirty && mailInput.minLengthError.state) &&
              <span className="profile__input-error">{mailInput.minLengthError.errorMessage}</span>
            }
            {(mailInput.isDirty && mailInput.maxLengthError.state) &&
              <span className="profile__input-error">{mailInput.maxLengthError.errorMessage}</span>
            }
            {(mailInput.isDirty && mailInput.isEmailError.state) &&
              <span className="profile__input-error">{mailInput.isEmailError.errorMessage}</span>
            }
          </label>
        </div>
        <button
          disabled={(isInputsValid && isNewData) ? false : true}
          type='submit'
          className={`profile__button`}
        >Редактировать</button>
      </form>
      <button onClick={handleLogout} className="profile__button profile__button_color_red">Выйти из аккаунта</button>
    </main>
  );
};

export default Profile;
