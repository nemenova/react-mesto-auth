import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
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
import Login from './Login'
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from './Auth';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [status, setStatus] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const history = useHistory();
    const [email, setEmail] = React.useState(' ');


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
    React.useEffect(() => {
        console.log('fghjk')
       
            // const token = localStorage.getItem('token');
            // console.log(token)
            // здесь будем проверять токен
           
                Auth.getContent()
                    .then((res) => {
                        console.log(res)
                        setEmail(res.data.email)
                        setLoggedIn(true)
                        history.push('/')

                    })
                    .catch((err) => {
                        console.log(err); // выведем ошибку в консоль
                    })
            
        
    }, [history])

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
    function handleRegister(password, email) {
        Auth.register(password, email)
            .then((res) => {
                setIsInfoTooltipOpen(true)
                history.push('/signin');
                setStatus(true)
                if (res) {

                }

            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            })
    }

    function handleSignOut() {
        localStorage.removeItem('token');
        history.push('/signin');
    }

    function handleSignIn(password, email) {
        Auth.authorize(password, email)
            .then(() => {
                setLoggedIn(true)
                history.push('/');
            })
            .catch(err => console.log(err));
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
        setIsInfoTooltipOpen(false)
        setSelectedCard(null)
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header values={email} onSignOut={handleSignOut} />
            <Switch>
                {/* <Route exact path="/">
                    {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
                </Route>  */}
                <Route path="/signup">
                    <Register onRegister={handleRegister} />

                </ Route>
                <Route path="/signin">
                    <Login onLogin={handleSignIn} />
                </ Route>

                <ProtectedRoute
                    path="/"
                    loggedIn={loggedIn}
                    component={Main} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                />

            </Switch>
            <Footer />
            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} />
            <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} />
            <EditProfilePopup onUpdateUser={handleUpdateUser} isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} />
            <ImagePopup name='image' card={selectedCard !== null && selectedCard} onClose={closeAllPopups} />
            <InfoTooltip onRegister={handleRegister} status={status} isOpened={isInfoTooltipOpen} onClose={closeAllPopups} />

        </CurrentUserContext.Provider>
    );
}

export default App;
