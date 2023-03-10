import './ConfirmationPopup.css'

const ConfirmationPopup = ({ onConfirm, onCloseButton, isOpen }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    onConfirm();
  };

  return (
    <section className={`confirmation-popup ${isOpen && `confirmation-popup_opened`}`} aria-label="Секция с попапом">
      <div className='confirmation-popup__container'>
        <button
          onClick={onCloseButton}
          className='confirmation-popup__close-button'
        />
        <form
          onSubmit={handleSubmit}
          className='confirmation-popup__form'
        >
          <h2 className='confirmation-popup__form-title'>Применить изменения?</h2>
          <button className='confirmation-popup__submit'>Да</button>
        </form>
      </div>
    </section>
  );
};

export default ConfirmationPopup;
