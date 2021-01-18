import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Header from './Header.js';
import HeaderMobile from './HeaderMobile.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';
import Body from './Body.js';
import * as auth from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { api } from '../utils/api.js';

import success from '../images/success.svg';
import fail from '../images/fail.svg';

function App() {
  const [email, setEmail] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [cardToDelete, setCardToDelete] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [tooltipImage, setTooltipImage] = React.useState('');
  const [tooltipText, setTooltipText] = React.useState('');
  const [isHeaderMobile, setHeaderMobile] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    let jwt = localStorage.getItem('jwt');
    if(jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if(res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            history.push('/');
          }
        })
        .catch((err) => console.log(err));
  }}, [history]);

   React.useEffect(() => {
     Promise.all([api.getUserInfo(), api.getInitialCards()])
     .then(([info, cards]) => {
      setCurrentUser(info);
      setCards(cards);
     })
     .catch((err) => {
      console.log(err);
    });
  }, []);

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        auth.getContent(data.token) 
          .then((res) => {
            setEmail(res.data.email);
          })
          .catch((err) => {
            console.log(err)
          });
        if(data.token) {
          setLoggedIn(true);
          setTooltipImage(success);
          setTooltipText('Вы успешно вошли в аккаунт!');
          history.push('/');
          setInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        setTooltipImage(fail);
        setTooltipText('Что-то пошло не так! Попробуйте ещё раз.');
        console.log(err);
        setInfoTooltipOpen(true);
      });
  }

  function handleRegister(email, password) {
    auth.register(email, password) 
      .then(() => {
        setTooltipImage(success);
        setTooltipText('Вы успешно зарегистрировались!');
        history.push('/signin');
        setInfoTooltipOpen(true);
      })
      .catch((err) => {
        setTooltipImage(fail);
        setTooltipText('Что-то пошло не так! Попробуйте ещё раз.');
        console.log(err);
        setInfoTooltipOpen(true);
      });
  }

  function handleOpenMenu() {
    setHeaderMobile(true);
  }

  function handleCloseMenu() {
    setHeaderMobile(false);
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setHeaderMobile(false);
    history.push('/signin');
  }

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
    setInfoTooltipOpen(false);
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
    .then(() => {
      setCards(cards.filter((card) => card !== cardToDelete));
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateUser(userInfo) {
    api
    .editUserInfo(userInfo)
    .then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(avatar) {
    api
    .editAvatar(avatar)
    .then((newAvatar) => {
      setCurrentUser(newAvatar);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(newCard) {
    api
    .addNewCard(newCard) 
    .then((newCardData) => {
      setCards([newCardData, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }
 
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {
          isHeaderMobile 
          ? <HeaderMobile 
          onSignOut={handleSignOut}
          email={email}
          onMenuClose={handleCloseMenu}/>
          : <Header 
          onSignOut={handleSignOut}
          email={email}
          onMenuOpen={handleOpenMenu}/>
        }
        <Switch>
          <Route path="/signup">
            <Register onRegister={handleRegister}/>
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin}/>
          </Route>
          <ProtectedRoute exact path='/'
            component={Body}
            loggedIn={loggedIn}
            handleEditProfileClick={handleEditProfileClick}
            handleAddPlaceClick={handleAddPlaceClick}
            handleEditAvatarClick={handleEditAvatarClick}
            cards={cards}
            handleCardClick={handleCardClick}
            handleDeleteCardClick={handleDeleteCardClick}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
            isEditProfilePopupOpen={isEditProfilePopupOpen}
            closeAllPopups={closeAllPopups}
            handleUpdateUser={handleUpdateUser}
            isAddPlacePopupOpen={isAddPlacePopupOpen}
            handleAddPlaceSubmit={handleAddPlaceSubmit}
            isEditAvatarPopupOpen={isEditAvatarPopupOpen}
            handleUpdateAvatar={handleUpdateAvatar}
            isDeleteCardPopupOpen={isDeleteCardPopupOpen}
            isImagePopupOpen={isImagePopupOpen}
            selectedCardName={selectedCard.name}
            selectedCardLink={selectedCard.link} />
          <Route>
            {
              loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />
            }
          </Route>
        </Switch>
        <InfoTooltip 
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          name='tooltip'
          tooltipImage={tooltipImage}
          tooltipText={tooltipText} />
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
