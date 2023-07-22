const PopupWithForm = (props) => {
  return (
    <section
      className={`${props.name}-popup popup ${
        props.isOpen ? "popup_opened" : ""
      }`}
      aria-label="Модальное окно"
    >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form"
          name={`${props.name}Form`}
          // noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button type="submit" className="popup__save">
            {props.buttonText}
          </button>
        </form>
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

export default PopupWithForm;
