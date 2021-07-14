import React from 'react'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__photo-container">
                    <img src={currentUser.avatar} alt="фото профиля" className="profile__photo"></img>
                    <button type="button" className="profile__photo-edit-btn" onClick={props.onEditAvatar} ></button>
                </div>
                <div className="profile__text">
                    <div className="profile__title">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" aria-label="редактировать" className="profile__edit-btn btn-opacity-change" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-btn btn-opacity-change" onClick={props.onAddPlace}></button>
            </section>

            <section className="cards">
                {props.cards.map((item) => (
                    <Card card={item} key={item._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                ))}
            </section>
        </main>
    )

}
export default Main;