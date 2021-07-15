import React from 'react';
import { Route } from 'react-router-dom';
import ImagePopup from './ImagePopup';
import Header from './Header';
import Main from './Main'
import Footer from './Footer'
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Register from './Register';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getCards()])
            .then(([user, cards]) => {
                setCurrentUser(user);
                setCards(cards)
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            })
    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id))
            })
            .catch(err => console.log(err))
    }

    function handleUpdateUser(data) {
        api.changeUserInfo(data)
            .then((user) => {
                setCurrentUser(user);
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            })
    }
    function handleUpdateAvatar(data) {
        api.changeProfilePhoto(data)
            .then((user) => {
                setCurrentUser(user)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            })
    }
    function handleAddPlaceSubmit(card) {
        api.addNewCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            })
    }
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }
    function handleCardClick(card) {
        setSelectedCard(card)
    }
    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false)
        setSelectedCard(null)
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header />
            <Route path="/">
                <Register />
            </ Route>
            <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} />
            <Footer />
            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} />
            <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} />
            <EditProfilePopup onUpdateUser={handleUpdateUser} isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} />
            <ImagePopup name='image' card={selectedCard !== null && selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
    );
}

export default App;
