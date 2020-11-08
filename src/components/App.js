import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/api.js';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isRemovalPopupOpen, setRemovalPopupOpen] = React.useState(false);

  const userName = userInfo.name;
  const userDescription = userInfo.about;
  const userAvatar = userInfo.avatar;

  React.useEffect(() => {
    api
    .getUserInfo()
    .then((info) => {
      setUserInfo(info)
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  React.useEffect(() => {
    api
    .getInitialCards()
    .then((cards) => {
      setCards(cards)
    })
    .catch((err) => {
      console.log(err);
    });
  }, [])

  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick() {
    setRemovalPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
  }

  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        userName={userName}
        userDescription={userDescription}
        userAvatar={userAvatar}
        cards={cards}
        onCardClick={handleCardClick}
        onDeteteCardClick={handleDeleteCardClick}
        />
        <Footer />
        <PopupWithForm 
        name="user"
        isOpen={isEditProfilePopupOpen}
        title="Редактировать профиль"
        onClose={closeAllPopups}
        buttonText="Сохранить"
        >
          <input placeholder="Имя пользователя" name="name" id="user-name" className="popup__input popup-user__field" type="text" required minLength="2" maxLength="40" />
          <span className="popup__error" id="user-name-error"></span>
          <input placeholder="Род деятельности" name="about" id="user-job" className="popup__input popup-user__field" type="text" required minLength="2" maxLength="200" />
          <span className="popup__error" id="user-job-error"></span>
        </PopupWithForm>
        <PopupWithForm
        name="card"
        isOpen={isAddPlacePopupOpen}
        title="Новое место"
        onClose={closeAllPopups}
        buttonText="Создать"
        >
          <input placeholder="Название" name="name" id="card-name" className="popup__input popup-card__field" type="text" required minLength="1" maxLength="30" />
          <span className="popup__error" id="card-name-error"></span>
          <input placeholder="Ссылка на картинку" name="link" id="card-link" className="popup__input popup-card__field" required type="url" />
          <span className="popup__error" id="card-link-error"></span>
        </PopupWithForm>
        <PopupWithForm
        name="avatar"
        isOpen={isEditAvatarPopupOpen}
        title="Обновить аватар"
        onClose={closeAllPopups}
        buttonText="Сохранить"
        >
          <input placeholder="Ссылка на картинку" name="avatar" id="avatar-link" className="popup__input popup-avatar__field" required type="url" />
          <span className="popup__error" id="avatar-link-error"></span>
        </PopupWithForm>
        <PopupWithForm
        name="removal"
        isOpen={isRemovalPopupOpen}
        title="Вы уверены?"
        onClose={closeAllPopups}
        buttonText="Да"
        />
        <ImagePopup 
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        name={selectedCard.name}
        link={selectedCard.link}
        />
        </div>
    </div>
  );
}

export default App;
