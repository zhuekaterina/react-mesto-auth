import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarRef = React.useRef();

    React.useEffect(() => {
        if(isOpen) {
        avatarRef.current.value = '';
        }
    }, [isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value
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
        <input placeholder="Ссылка на картинку" ref={avatarRef} name="avatar" id="avatar-link" className="popup__input popup-avatar__field" required type="url" />
        <span className="popup__error" id="avatar-link-error"></span>
    </PopupWithForm>
    )
}

export default EditAvatarPopup;