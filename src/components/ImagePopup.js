import React from 'react';

function ImagePopup({isOpen, onClose, name, link}) {
    return(
        <div className={`popup popup-zoom ${isOpen && 'popup_opened'}`}>
            <figure className="popup-zoom__figure">
                <button type="button" name="image-close-button" className="popup__close-button popup-zoom__close-button" onClick={onClose}></button>
                <img className="popup-zoom__image" alt={name} src={link} />
                <h4 className="popup-zoom__name">{name}</h4>
            </figure>
        </div>
    );
}

export default ImagePopup;