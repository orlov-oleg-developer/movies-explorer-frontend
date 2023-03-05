import './AttentionPopup.css'

const AttentionPopup = ({ onCloseButton, isOpen, message }) => {

  return (
    <section className={`attention-popup ${isOpen && `attention-popup_opened`}`} aria-label="Секция с попапом">
      <div className='attention-popup__container'>
        <button
          onClick={onCloseButton}
          className='attention-popup__close-button'
        />
        <h2 className='attention-popup__title'>{message}</h2>
      </div>
    </section>
  );
};

export default AttentionPopup;
