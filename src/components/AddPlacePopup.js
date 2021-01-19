import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [placeName, setPlaceName] = React.useState('');
    const [placeUrl, setPlaceUrl] = React.useState('');
    
    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            name: placeName,
            link: placeUrl
        })
    }

    function handlePlaceNameChange(evt) {
        evt.preventDefault();
        setPlaceName(evt.target.value);
    }

    function handlePlaceUrlChange(evt) {
        evt.preventDefault();
        setPlaceUrl(evt.target.value);
    }

    React.useEffect(() => {
        if(isOpen) {
        setPlaceName('');
        setPlaceUrl('');
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
            <input placeholder="Название" value={placeName || ""} onChange={handlePlaceNameChange} name="name" id="card-name" className="popup__input popup-card__field" type="text" required minLength="1" maxLength="30" />
            <span className="popup__error" id="card-name-error"></span>
            <input placeholder="Ссылка на картинку" value={placeUrl || ""} onChange={handlePlaceUrlChange} name="link" id="card-link" className="popup__input popup-card__field" required type="url" />
            <span className="popup__error" id="card-link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;