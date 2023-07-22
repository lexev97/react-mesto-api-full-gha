import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = (props) => {
  const userCtx = useContext(CurrentUserContext);

  const userName = userCtx.name;
  const userDescription = userCtx.about;
  const userAvatar = userCtx.avatar;

  return (
    <main className="content">
      <section className="profile" aria-label="Пользователь">
        <div
          className="profile__avatar"
          aria-label="Аватар пользователя"
          onClick={props.onEditAvatar}
          style={{ backgroundImage: `url(${userAvatar})` }}
        ></div>
        <div className="profile__info">
          <div className="profile__name-area">
            <h1 className="profile__name">{userName}</h1>
            <button
              type="button"
              className="profile__edit"
              aria-label="Редактировать профиль"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button
          type="button"
          className="profile__add"
          aria-label="Добавить место"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements" aria-label="Карточки с посещенными местами">
        <ul className="elements__grid">
          {props.cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              onCardClick={props.onCardClick}
              onLikeClick={props.onLikeClick}
              onDeleteClick={props.onDeleteClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
