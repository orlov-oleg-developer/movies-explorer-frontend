import './Profile.css'

const Profile = () => {
  return (
    <main className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form">
        <label className="profile__form-field">
          Имя
          <input
            className="profile__input"
            name="form-name-input"
            type="string"
            value={"Виталий"}
            disabled={true}
          />
          <span className="profile__input-error"/>
        </label>
        <label className="profile__form-field">
          E-mail
          <input
            className="profile__input"
            name="form-mail-input"
            type="string"
            value={"pochta@yandex.ru"}
            disabled={true}
          />
          <span className="profile__input-error"/>
        </label>
      </form>
      <button className="profile__button">Редактировать</button>
      <button className="profile__button profile__button_color_red">Выйти из аккаунта</button>
    </main>
  );
};

export default Profile;
