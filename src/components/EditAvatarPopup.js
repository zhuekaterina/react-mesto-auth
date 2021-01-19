import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const [avatar, setAvatar] = React.useState('');

    React.useEffect(() => {
        if(isOpen) {
        setAvatar('');
        }
    }, [isOpen]);

    function handleAvatarChange(evt) {
        evt.preventDefault();
        setAvatar(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: avatar
        });
    }
    
    return(
    <PopupWithForm
        name="avatar"
        isOpen={isOpen}
        title="Обновить аватар"
        onClose={onClose}
        buttonText="Сохранить"
        onSubmit={handleSubmit}
    >
        <input placeholder="Ссылка на картинку" onChange={handleAvatarChange} value={avatar || ""} name="avatar" id="avatar-link" className="popup__input popup-avatar__field" required type="url" />
        <span className="popup__error" id="avatar-link-error"></span>
    </PopupWithForm>
    )
}

export default EditAvatarPopup;