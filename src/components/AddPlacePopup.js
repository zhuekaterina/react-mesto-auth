import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const placeNameRef = React.useRef();
    const placeUrlRef = React.useRef();
    
    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            name: placeNameRef.current.value,
            link: placeUrlRef.current.value
        })
    }

    React.useEffect(() => {
        if(isOpen) {
        placeNameRef.current.value = '';
        placeUrlRef.current.value = '';
        }
    }, [isOpen]);

    return (
        <PopupWithForm
            name="card"
            isOpen={isOpen}
            title="Новое место"
            onClose={onClose}
            buttonText="Создать"
            onSubmit={handleSubmit}
        >
            <input placeholder="Название" ref={placeNameRef} name="name" id="card-name" className="popup__input popup-card__field" type="text" required minLength="1" maxLength="30" />
            <span className="popup__error" id="card-name-error"></span>
            <input placeholder="Ссылка на картинку" ref={placeUrlRef} name="link" id="card-link" className="popup__input popup-card__field" required type="url" />
            <span className="popup__error" id="card-link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;