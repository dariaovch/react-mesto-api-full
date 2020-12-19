import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import UpdateAvatarPopup from './UpdateAvatarPopup.js';
import AddCardPopup from './AddCardPopup.js';
// import DeleteCardPopup from './components/DeleteCardPopup.js';
import PopupWithImage from './PopupWithImage.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { api } from '../utils/Api.js';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import * as auth from '../utils/auth.js';
import InfoTooltip from './InfoTooltip.js';
import Success from '../images/success.png';
import Fail from '../images/fail.png';

function App() {

  //Стейт-переменные конктекста текущего пользователя, карточек и открытия попапов

  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: '#'
  });
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isUpdateAvatarPopupOpen, setIsUpdateAvatarPopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '#'
  });

  // Стейт-переменные для авторизации
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [isSuccessTooltipOpen, setIsSuccessTooltipOpen] = React.useState(false);
  const [isFailTooltipOpen, setIsFailTooltipOpen] = React.useState(false);

  const history = useHistory();


  // Получаем из API данные пользователя и карточек
  React.useEffect(() => {
    if(loggedIn) {
      api.getAllPageData()
       .then((argument) => {
          const [ userData, cardsData ] = argument;

          setCurrentUser(userData);
          setCards(cardsData);
       })
       .catch((err) => {
          console.log(err);
       });
  }
}, [loggedIn]);

  // React.useEffect(() => {
  //   api.getInitialCards()
  //      .then((cardsData) => {
  //         setCards(cardsData);
  //      })
  //      .catch((err) => {
  //         console.log(err);
  //      });
  // }, []);

  // React.useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   auth.getContent(token)
  //       .then((res) => { 
  //         console.log(res)
  //         if(res) {
  //           api.getUserInfo(res._id)
  //             .then((userData) => {
  //               setCurrentUser(userData)
  //             })
  //             .catch((err) => console.log(err))
  //         }
  //       })
  //       .catch((err) => console.log(err))
  //     }, []);

  //Логика открытия и закрытия попапов

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleUpdateAvatarClick() {
    setIsUpdateAvatarPopupOpen(true);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleCardClick(item) {
    setIsImagePopupOpen(true);
    setSelectedCard(item);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsUpdateAvatarPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({
      name: '',
      link: '#'
    });
    setIsSuccessTooltipOpen(false);
    setIsFailTooltipOpen(false);
  }

  //Логика получения данных из форм и их отправка на сервер с дальнейшим обновлением данных на странице

  function handleUpdateUser(formData) {
    api.saveEditedInfo(formData)
       .then((data) => {
         setCurrentUser(data);
         closeAllPopups();
       })
       .catch((err) => {
        console.log(err);
       });
  }

  function handleUpdateAvatar(formData) {
    api.updateAvatar(formData)
       .then((data) => {
         setCurrentUser(data);
         closeAllPopups();
       })
       .catch((err) => {
        console.log(err);
       });
  }

  function handleAddCardSubmit(formData) {
    api.addNewCard(formData)
       .then((newCard) => {
         setCards([newCard, ...cards])
         closeAllPopups();
       })
       .catch((err) => {
        console.log(err);
       });
  }


  // Логика постановки и снятия лайков через запрос к API
  function handleCardLike(item) {
    const isLiked = item.likes.some(i => i === currentUser._id);
    const cardId = item._id;

    api.changeLikeCardStatus(cardId, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === item._id ? newCard : c);
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // Логика удаления карточки
  function handleCardDelete(item) {
   
    api.deleteCard(item._id).then(() => {
     const newCards = cards.filter((c) => c._id !== item._id);
     setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // Логика регистрации и авторизации
  
  function handleRegister(email, password) {
    console.log(email, password)
    auth.register(email, password)
      .then((res) => {
        console.log('Вы успешно зарегистрировались!')
        setUserEmail(res.email);
        setIsSuccessTooltipOpen(true);
        setTimeout(() => 
          setIsSuccessTooltipOpen(false),
          3000
        );
        history.push('/sign-in');
      })
      .catch((err) => {
        if(err.status === '400') {
          console.log('Неверно заполнено одно из полей')}
        
        setIsFailTooltipOpen(true)
        setTimeout(() => 
        setIsFailTooltipOpen(false),
        10000
        );
      })
  }

  function handleLogin(email, password) {
    auth.login(email, password)
      .then((res) => {
        if(res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          setUserEmail(email);
          tokenCheck();
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err)
        if(err.status === '400') {
          console.log('Неверно заполнено одно из полей')} else if (err.status === '401') {
            console.log('Пользователь с таким email не найден');
          }

        setIsFailTooltipOpen(true)
        setTimeout(() => 
        setIsFailTooltipOpen(false),
        10000
        );
      })
  }

  function tokenCheck() {
    const token = localStorage.getItem('token')
    if(token) {
      auth.getContent(token)
        .then((res) => { 
          if(res) {
            setUserEmail(res.email);
            setLoggedIn(true)
            history.push('/');
          }
        })
        .catch((err) => console.log(err))
    }
  }


  function handleLogout() {
      localStorage.removeItem('token');
      setUserEmail('');
      setLoggedIn(false);
      history.push('/sign-in');
  }

  // Проверяем наличие валидного токена
  React.useEffect(() => {
    tokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // eslint предлагает добавить саму функцию в зависимости, что приведет к ошибке, поэтому exhaustive-depths отключен для этой строки

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header loggedIn={loggedIn} handleLogout={handleLogout} userEmail={userEmail} />
          <Switch>
            <Route exact path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} onEditProfile={handleEditProfileClick} onUpdateAvatar={handleUpdateAvatarClick} onAddCard={handleAddCardClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
            </Route>
            <Route path="/sign-up">
              <Register handleRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} tokenCheck={tokenCheck} />
            </Route>
          </Switch>
          <Footer />
        </div>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <UpdateAvatarPopup isOpen={isUpdateAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <AddCardPopup isOpen={isAddCardPopupOpen} onClose={closeAllPopups} onAddCard={handleAddCardSubmit} />

        <PopupWithImage isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups} />

        {/* <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onCardDelete={handleCardDelete} onClose={closeAllPopups} /> */}
      
        <InfoTooltip name="success" title="Вы успешно зарегистрировались!" src={Success} isOpen={isSuccessTooltipOpen} onClose={closeAllPopups} />
        <InfoTooltip name="fail" title="Что-то пошло не так! Попробуйте ещё раз." src={Fail} isOpen={isFailTooltipOpen} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
