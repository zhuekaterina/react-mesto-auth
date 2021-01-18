import React from 'react';
import Main from './Main.js';
import Footer from './Footer.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function Body(props) {
    return (
        <>
        <Main
          onEditProfile={props.handleEditProfileClick}
          onAddPlace={props.handleAddPlaceClick}
          onEditAvatar={props.handleEditAvatarClick}
          cards={props.cards}
          onCardClick={props.handleCardClick}
          onDeleteCardClick={props.handleDeleteCardClick}
          onCardLike={props.handleCardLike}
          onCardDelete={props.handleCardDelete}
        />
        <Footer />
        <EditProfilePopup isOpen={props.isEditProfilePopupOpen} onClose={props.closeAllPopups} onUpdateUser={props.handleUpdateUser}/>
        <AddPlacePopup isOpen={props.isAddPlacePopupOpen} onClose={props.closeAllPopups} onAddPlace={props.handleAddPlaceSubmit}/>
        <EditAvatarPopup isOpen={props.isEditAvatarPopupOpen} onClose={props.closeAllPopups} onUpdateAvatar={props.handleUpdateAvatar}/> 
        <DeleteCardPopup isOpen={props.isDeleteCardPopupOpen} onClose={props.closeAllPopups} onDeleteCard={props.handleCardDelete}/>
        <ImagePopup 
          isOpen={props.isImagePopupOpen}
          onClose={props.closeAllPopups}
          name={props.selectedCardName}
          link={props.selectedCardLink}
        />
        </>
    )
}

export default Body;