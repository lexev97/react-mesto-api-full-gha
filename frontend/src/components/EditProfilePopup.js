import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const userCtx = useContext(CurrentUserContext);

  useEffect(() => {
    setName(userCtx.name);
    setDescription(userCtx.about);
  }, [userCtx, props.isOpen]);

  const handleNameInput = (e) => {
    setName(e.target.value);
  };
  const handleDescriptionInput = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label>
        <input
          className="popup__input"
          type="text"
          id="name-input"
          name="nameInput"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          value={name || ""}
          onChange={handleNameInput}
        />
        {/* <span className="popup__input-error name-input-error"></span> */}
      </label>
      <label>
        <input
          className="popup__input"
          type="text"
          id="description-input"
          name="descriptionInput"
          placeholder="Профессия"
          minLength="2"
          maxLength="200"
          required
          value={description || ""}
          onChange={handleDescriptionInput}
        />
        {/* <span className="popup__input-error description-input-error"></span> */}
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
