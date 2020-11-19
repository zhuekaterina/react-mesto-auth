import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({card, onCardClick, onDeleteCardClick, onCardLike}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = `element__delete-button ${isOwn && 'element__delete-button_visible'}`;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like-button ${isLiked && 'element__like-button_active'}`; 

    function handleCardClick() {
        onCardClick(card);
    }
    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteCardClick() {
        onDeleteCardClick(card)
    }

    return(
        <div className="element">
            <button type="button" className={cardDeleteButtonClassName} name="delete-button" onClick={handleDeleteCardClick}></button>
            <img className="element__picture" alt={card.name} src={card.link} onClick={handleCardClick}/>
            <div className="element__caption">
                <h2 className="element__name">{card.name}</h2>
                <div className="element__likes">
                    <button type="button" className={cardLikeButtonClassName} name="like-button" onClick={handleLikeClick}></button>
                    <p className="element__likes-number">{card.likes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;