import './Profile.css'
import React, { FC, useEffect, useState } from 'react';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import useInput from "../../hooks/useInput";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import Preloader from "../Preloader/Preloader";

interface Profile {
  onLogout: () => void;
}

const Profile: FC<Profile> = ({ onLogout }) => {
  const { updateUserInfo } = useActions()

  const { user, error, loading } = useTypedSelector(state => state.user);
  const [isInputsValid, setIsInputsValid] = useState<boolean>(false);
  const [isNewData, setIsNewData] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  const checkData = (name: string, email: string): void => {
    if (name === nameInput.value && email === mailInput.value) {
      setIsNewData(false);
    } else setIsNewData(true);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isNewData) return;
    console.log(nameInput, mailInput)
    { isInputsValid && setIsOpen(true) };
  }

  const handleConfirm = (): void => {
    updateUserInfo({
      name: nameInput.value,
      email: mailInput.value,
    })
    setIsOpen(false);
  }

  const handleClosePopup = () => {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!user.name) return
    nameInput.onChange(user.name);
    mailInput.onChange(user.email);
  }, [user])

  useEffect(() => {
    if (nameInput.isInputValid && mailInput.isInputValid) {
      setIsInputsValid(true);
    } else setIsInputsValid(false);
    checkData(user.name, user.email);
  }, [nameInput, mailInput]);

  if (!user.name) return <Preloader />

  return (
    <main className="profile">
      <ConfirmationPopup
        onConfirm={handleConfirm}
        onCloseButton={handleClosePopup}
        isOpen={isOpen}
        message={'Применить изменения?'}
        buttonText={'Да'}
      />
      <h1 className="profile__title">{`Привет, ${user.name}!`}</h1>
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
              onChange={(event) => nameInput.onChange(event.target.value)}
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
              onChange={(event) => mailInput.onChange(event.target.value)}
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
        {error && <p className="profile__server-error">{error}</p>}
        <button
          disabled={(isInputsValid && isNewData && !loading) ? false : true}
          type='submit'
          className={`profile__button`}
        >Редактировать</button>
      </form>
      <button onClick={onLogout} className="profile__button profile__button_color_red">Выйти из аккаунта</button>
    </main>
  );
};

export default Profile;
