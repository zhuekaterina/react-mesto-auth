import React from 'react';

function InfoTooltip({name, isOpen, onClose, loggedIn, tooltipImage, tooltipText}) {
    return(
        <div className={`popup popup-${name} ${isOpen && 'popup_opened'}`}>
            <button type="button" name="close-button" className={`popup__close-button popup-${name}__close-button`} onClick={onClose}></button>
            <div className={'popup-tooltip__container'}>
                <img className={`popup-${name}__image`} src={tooltipImage} alt={loggedIn ? "Галочка, подтверждающая успешный вход" : "Крестик, вход не выполнен"}/>
                <h3 className={`popup-${name}__text`}>{tooltipText}</h3>
            </div>
        </div>
    );
}

export default InfoTooltip;