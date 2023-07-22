import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {
  const placeNameRef = useRef();
  const picLinkRef = useRef();

  useEffect(() => {
    placeNameRef.current.value = "";
    picLinkRef.current.value = "";
  }, [props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onAddPlace({
      name: placeNameRef.current.value,
      link: picLinkRef.current.value,
    });
  };

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label>
        <input
          ref={placeNameRef}
          className="popup__input"
          type="text"
          id="place-name"
          name="placeName"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        {/* <span className="popup__input-error place-name-error"></span> */}
      </label>
      <label>
        <input
          ref={picLinkRef}
          className="popup__input"
          type="url"
          id="img-link"
          name="imgLink"
          placeholder="Ссылка на картинку"
          required
        />
        {/* <span className="popup__input-error img-link-error"></span> */}
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
