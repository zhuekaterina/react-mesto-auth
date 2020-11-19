import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(evt) {
        setName(evt.target.value)
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateUser({
          name: name,
          about: description
        });
    }

    return (
    <PopupWithForm 
        name="user"
        isOpen={isOpen}
        title="Редактировать профиль"
        onClose={onClose}
        buttonText="Сохранить"
        onSubmit={handleSubmit}
        >
          <input placeholder="Имя пользователя" value={name || ""} onChange={handleChangeName} ame="name" id="user-name" className="popup__input popup-user__field" type="text" required minLength="2" maxLength="40" />
          <span className="popup__error" id="user-name-error"></span>
          <input placeholder="Род деятельности" value={description || ""} onChange={handleChangeDescription} name="about" id="user-job" className="popup__input popup-user__field" type="text" required minLength="2" maxLength="200" />
          <span className="popup__error" id="user-job-error"></span>
    </PopupWithForm>
    )
}

export default EditProfilePopup;