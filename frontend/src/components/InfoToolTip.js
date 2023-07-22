const InfoToolTip = (props) => {
  return (
    <section
      className={`${props.name}-popup popup ${
        props.isOpen ? "popup_opened" : ""
      }`}
      aria-label="Модальное окно"
    >
      <div className="popup__container info-tip">
        <props.tipIcon />
        <h2 className="popup__title">{props.title}</h2>
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

export default InfoToolTip;
