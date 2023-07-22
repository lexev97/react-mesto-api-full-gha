const ImagePopup = (props) => {
  return (
    <section
      className={`image-popup popup ${props.isOpen ? "popup_opened" : ""}`}
      aria-label="Просмотр картинки"
    >
      <div className="popup__img-container">
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <p className="popup__caption">{props.card.name}</p>
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
};

export default ImagePopup;
