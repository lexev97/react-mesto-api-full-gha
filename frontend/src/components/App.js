import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import Main from "./Main";
import ProtectedRouteElement from "./ProtectedRouteElement";
import Footer from "./Footer";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";
import authApi from "../utils/AuthApi";
import InfoToolTip from "./InfoToolTip";
import SuccessIcon from "./SuccessIcon";
import FailIcon from "./FailIcon";

function App() {
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isFailPopupOpen, setIsFailPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .fetchUserInfo()
        .then((res) => {
          if (res._id) {
            setCurrentUser((prevState) => ({ ...prevState, ...res }));
          } else {
            return Promise.reject(res);
          }
        })
        .catch((err) => console.log(`Ошибка загрузки данных профиля: ${err}`));

      api
        .getCardsfromServer()
        .then((res) => {
          if (typeof res === "object") {
            setCards(res);
          } else {
            return Promise.reject(res);
          }
        })
        .catch((err) => console.log(`Ошибка загрузки карточек: ${err}`));
    } else return;
  }, [loggedIn]);

  const tokenCheck = () => {
    console.log(Cookies.get("jwt"));
    if (Cookies.get("jwt")) {
      authApi
        .getUserData()
        .then((res) => {
          if (res.data.email) {
            setCurrentUser((prevState) => ({ ...prevState, ...res.data }));
            setLoggedIn(true);
            navigate("/", { replace: true });
          } else {
            return Promise.reject(res);
          }
        })
        .catch((err) => {
          if (err === 400) {
            console.log("Токен не передан или передан не в том формате");
          } else if (err === 401) {
            console.log("Переданный токен некорректен ");
          } else {
            console.log(err);
          }
        });
    }
  };
  const handleLogin = (userData) => {
    authApi
      .signIn(userData)
      .then((res) => {
        if (res.message === 'Авторизация прошла успешно!') {
          setLoggedIn(true);
          setCurrentUser((prevState) => ({
            ...prevState,
            email: userData.email,
          }));
          navigate("/", { replace: true });
        } else {
          return Promise.reject(res);
        }
      })
      .catch((err) => {
        setIsFailPopupOpen(true);
        if (err === 400) {
          console.log("Не передано одно из полей");
        } else if (err === 401) {
          console.log("Пользователь с таким email не найден");
        } else {
          console.log(err);
        }
      });
  };
  const handleRegistration = (userData) => {
    authApi
      .signUp(userData)
      .then((res) => {
        if (res.data.email) {
          setCurrentUser((prevState) => ({ ...prevState, ...res }));
          setIsSuccessPopupOpen(true);
          navigate("/sign-in", { replace: true });
        } else {
          return Promise.reject(res);
        }
      })
      .catch((err) => {
        setIsFailPopupOpen(true);
        if (err === 400) {
          console.log("Некорректно заполнено одно из полей ");
        } else {
          console.log(err);
        }
      });
  };
  const handleLogOutLink = () => {
    Cookies.remove("jwt");
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };
  const onDeleteClick = (card) => {
    setSelectedCard(card);
    setIsDeletePopupOpen(true);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .putLike(card._id)
        .then((res) => {
          if (res._id) {
            setCards((prevState) =>
              prevState.map((c) => (c._id === card._id ? res : c))
            );
          } else {
            return Promise.reject(res);
          }
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    } else {
      api
        .deleteLike(card._id)
        .then((res) => {
          if (res._id) {
            setCards((prevState) =>
              prevState.map((c) => (c._id === card._id ? res : c))
            );
          } else {
            return Promise.reject(res);
          }
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  };
  const handleCardDelete = () => {
    api
      .deleteCard(selectedCard._id)
      .then((res) => {
        if (res.message === "Пост удалён") {
          setCards((prevState) =>
            prevState.filter((c) => c._id !== selectedCard._id)
          );
          closeAllPopups();
        } else {
          return Promise.reject(res);
        }
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };
  const handleUpdateUser = (userData) => {
    api
      .patchProfileInfo(userData)
      .then((res) => {
        if (res._id) {
          setCurrentUser((prevState) => ({ ...prevState, ...res }));
          closeAllPopups();
        } else {
          return Promise.reject(res);
        }
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };
  const handleUpdateAvatar = (avatarLink) => {
    api
      .patchAvatar(avatarLink)
      .then((res) => {
        if (res._id) {
          setCurrentUser((prevState) => ({ ...prevState, ...res }));
          closeAllPopups();
        } else {
          return Promise.reject(res);
        }
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };
  const handleAddPlace = (newCardInfo) => {
    api
      .postNewCard(newCardInfo)
      .then((res) => {
        if (res._id) {
          setCards([res, ...cards]);
          closeAllPopups();
        } else {
          return Promise.reject(res);
        }
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setIsFailPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} handleLogOut={handleLogOutLink} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouteElement
              element={Main}
              loggedIn={loggedIn}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onLikeClick={handleCardLike}
              onDeleteClick={onDeleteClick}
            />
          }
        />
        <Route
          path="/sign-in"
          element={<Login handleLoginSubmit={handleLogin} />}
        />
        <Route
          path="/sign-up"
          element={<Register handleRegistrationSubmit={handleRegistration} />}
        />
        <Route path="*" element={<Navigate to="/sign-in" replace/>}></Route>
      </Routes>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <InfoToolTip
        name="success"
        title="Вы успешно зарегистрировались!"
        isOpen={isSuccessPopupOpen}
        onClose={closeAllPopups}
        tipIcon={SuccessIcon}
      />

      <InfoToolTip
        name="fail"
        title="Что-то пошло не так! Попробуйте ещё раз."
        isOpen={isFailPopupOpen}
        onClose={closeAllPopups}
        tipIcon={FailIcon}
      />

      <DeleteConfirmationPopup
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        onDeleteCard={handleCardDelete}
      />
      <ImagePopup
        onClose={closeAllPopups}
        card={selectedCard}
        isOpen={isImagePopupOpen}
      />

      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
