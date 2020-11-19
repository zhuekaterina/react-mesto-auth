import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function DeleteCardPopup({isOpen, onClose, onDeleteCard}) {

    function handleDeleteCard(evt) {
        evt.preventDefault();
        onDeleteCard();
    }
    return(
        <PopupWithForm
            name="removal"
            isOpen={isOpen}
            title="Вы уверены?"
            onClose={onClose}
            buttonText="Да"
            onSubmit={handleDeleteCard}
        />
    );
}

export default DeleteCardPopup;