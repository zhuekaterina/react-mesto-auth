import React from 'react';

function PopupWithForm({name, isOpen, title, children, onClose, buttonText}) {
    return(
        <div className={`popup popup-${name} ${isOpen && 'popup_opened'}`}>
            <button type="button" name="close-button" className={`popup__close-button popup-${name}__close-button`} onClick={onClose}></button>
            <form className={`popup__form popup-${name}__form`} noValidate>
                <h3 className={`popup-${name}__title`}>{title}</h3>
                {children}
                <button type="submit" className={`popup-${name}__save-button popup__button`} name="save-button" onClick={onClose}>{buttonText}</button>
            </form>
        </div>
    );
}

export default PopupWithForm;