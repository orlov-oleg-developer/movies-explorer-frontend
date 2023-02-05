import './Profile.css'
import { useState, useEffect } from "react";
import useInput from "../../hooks/useInput";

const Profile = ({ cbLogout, cbUpdateProfileInfo }) => {
  const [ isInputsValid, setIsInputsValid] = useState(false);
  const [ isFieldsActive, setIsFieldsActive ] = useState(false);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    {isInputsValid &&
      cbUpdateProfileInfo({
        // name:
      })
    }
  }

  useEffect(() => {

  }, [])

  useEffect(() => {
    if (nameInput.isInputValid && mailInput.isInputValid ) {
      setIsInputsValid(true);
    } else setIsInputsValid(false);
  }, [nameInput, mailInput ]);

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form
        className="profile__form"
        onSubmit={handleSubmit}
      >
        <label className="profile__form-field">
          Имя
          <input
            className="profile__input"
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
        <label className="profile__form-field">
          E-mail
          <input
            className="profile__input"
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
      </form>
      <button className="profile__button">Редактировать</button>
      <button onClick={cbLogout} className="profile__button profile__button_color_red">Выйти из аккаунта</button>
    </main>
  );
};

export default Profile;
