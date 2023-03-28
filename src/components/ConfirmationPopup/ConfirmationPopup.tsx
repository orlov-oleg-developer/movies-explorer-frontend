import './ConfirmationPopup.css'
import React, { FC } from 'react';

interface ConfirmationPopupProps {
  onConfirm: () => void;
  onCloseButton: () => void;
  isOpen: boolean;
  message: string;
  buttonText?: string;
}

const ConfirmationPopup: FC<ConfirmationPopupProps> = ({ onConfirm, onCloseButton, isOpen, message, buttonText }) => {
  const handleSubmit = (event: any) => {
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
          <h2 className='confirmation-popup__form-title'>{message}</h2>
          {buttonText && <button className='confirmation-popup__submit'>{buttonText}</button>}
        </form>
      </div>
    </section>
  );
};

export default ConfirmationPopup;
