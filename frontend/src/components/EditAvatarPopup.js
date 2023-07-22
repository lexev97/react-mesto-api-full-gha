import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {
  const avatarLinkRef = useRef();

  useEffect(() => {
    avatarLinkRef.current.value = "";
  }, [props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onUpdateAvatar(avatarLinkRef.current.value);
  };

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label>
        <input
          ref={avatarLinkRef}
          className="popup__input"
          type="url"
          id="avatar-link"
          name="avatarLink"
          placeholder="Ссылка на аватар"
          required
        />
        {/* <span className="popup__input-error avatar-link-error"></span> */}
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
