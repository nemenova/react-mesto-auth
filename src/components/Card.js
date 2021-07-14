import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `${isOwn ? 'card__delete-btn_active btn-opacity-change' : 'card__delete-btn'}`
    ); 
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `card__like-btn btn-opacity-change ${isLiked ? 'card__like-btn_active' : ' '}`
    );

    function handleClick() {
        onCardClick(card)
    }
    function handleLikeClick() {
        onCardLike(card)
    }
    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
            <li className="card">
            <button onClick={handleDeleteClick} type="button" className={cardDeleteButtonClassName}></button>
                <img onClick={handleClick} src={card.link} alt={card.name} className="card__image" />
                <div className="card__content">
                    <h2 className="card__title">{card.name}</h2>
                    <div>
                    <button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName}></button>
                        <span className="card__likes-number">{card.likes.length}</span>
                    </div>
                </div>
            </li>
    )

}
export default Card;