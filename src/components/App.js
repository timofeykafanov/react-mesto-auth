import { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import api from "../utils/Api.js";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
    };

    function handleUpdateUser(inputValues) {
        api.setUserInfo(inputValues)
        .then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleUpdateAvatar(inputValue) {
        api.setUserAvatar(inputValue)
        .then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleAddPlaceSubmit(inputValues) {
        api.setCard(inputValues)
        .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card)
        .then(() => {
            setCards(cards.filter((elem) => elem !== card));
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
            setCurrentUser(user);
            setCards(cards);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header />
            
            {/* <Routes>
                <Route path="/sign-up">

                </Route>
                <Route path="/sign-in">

                </Route>
                <ProtectedRoute path="/">

                </ProtectedRoute>
            </Routes> */}

            {/* <Main
                onAddPlace={handleAddPlaceClick}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onCardClick={handleCardClick}
                setCards={setCards}
            />

            <Footer /> */}

            {/* <form className="form">
                <h2 className="form__heading">Регистрация</h2>
                <input className="form__input" type="email" placeholder="Email"></input>
                <input className="form__input" type="password" placeholder="Пароль"></input>
                <button className="form__button" type="submit">Зарегистрироваться</button>
                <p className="form__text">Уже зарегистрированы? <a className="form__link" href="/">Войти</a></p>
            </form> */}

            {/* <form className="form">
                <h2 className="form__heading">Вход</h2>
                <input className="form__input" type="email" placeholder="Email"></input>
                <input className="form__input" type="password" placeholder="Пароль"></input>
                <button className="form__button" type="submit">Войти</button>
            </form> */}

            {/* <div className="popup popup_opened">
                <div className="popup__content popup__content_type_confirm">
                    <button className="popup__close" type="button"></button>
                    <div className="popup__icon popup__icon_type_confirm"></div>
                    <p className="popup__text">Вы успешно зарегистрировались!</p>
                </div>
            </div> */}

            {/* <div className="popup popup_opened">
                <div className="popup__content popup__content_type_confirm">
                    <button className="popup__close" type="button"></button>
                    <div className="popup__icon popup__icon_type_error"></div>
                    <p className="popup__text">Что-то пошло не так! Попробуйте ещё раз.</p>
                </div>
            </div> */}

            <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />

            <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />

            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} /> 

            <PopupWithForm name="delete" title="Вы уверены?" />

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
    );
}

export default App;