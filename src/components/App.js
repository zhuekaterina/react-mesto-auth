import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { api } from '../utils/api.js';

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
  const [cardToDelete, setCardToDelete] = React.useState(null);

   React.useEffect(() => {
    api
    .getUserInfo()
    .then((info) => {
      setCurrentUser(info)
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

  function handleDeleteCardClick(card) {
    setDeleteCardPopupOpen(true);
    setCardToDelete(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setDeleteCardPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
    .changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch((err) => {
        console.log(err);
    });
  } 
  
  function handleCardDelete() {
    api
    .deleteCard(cardToDelete._id)
    .then(() => setCards(cards.filter((card) => card !== cardToDelete)))
    .catch((err) => {
      console.log(err);
    });
    closeAllPopups();
  }

  function handleUpdateUser(userInfo) {
    api
    .editUserInfo(userInfo)
    .then((newUserInfo) => setCurrentUser(newUserInfo))
    .catch((err) => {
      console.log(err);
    });
    closeAllPopups();
  }

  function handleUpdateAvatar(avatar) {
    api
    .editAvatar(avatar)
    .then((newAvatar) => setCurrentUser(newAvatar))
    .catch((err) => {
      console.log(err);
    });
    closeAllPopups();
  }

  function handleAddPlaceSubmit(newCard) {
    api
    .addNewCard(newCard) 
    .then((newCardData) => setCards([newCardData, ...cards]))
    .catch((err) => {
      console.log(err);
    });
    closeAllPopups();
  }
 
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          cards={cards}
          onCardClick={handleCardClick}
          onDeleteCardClick={handleDeleteCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 
        <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onDeleteCard={handleCardDelete}/>
        <ImagePopup 
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          name={selectedCard.name}
          link={selectedCard.link}
        />
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
