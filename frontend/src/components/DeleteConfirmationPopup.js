import PopupWithForm from "./PopupWithForm";

const DeleteConfirmationPopup = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    props.onDeleteCard();
  };

  return (
    <PopupWithForm
      name="confirmation"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default DeleteConfirmationPopup;
