import React from 'react';

function Card({card, onCardClick, onDeteteCardClick}) {
    function handleCardClick() {
        onCardClick(card);
    }

    return(
        <div className="element">
            <button type="button" className="element__delete-button" name="delete-button" onClick={onDeteteCardClick}></button>
            <img className="element__picture" alt={card.name} src={card.link} onClick={handleCardClick}/>
            <div className="element__caption">
                <h2 className="element__name">{card.name}</h2>
                <div className="element__likes">
                    <button type="button" className="element__like-button" name="like-button"></button>
                    <p className="element__likes-number">{card.likes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;