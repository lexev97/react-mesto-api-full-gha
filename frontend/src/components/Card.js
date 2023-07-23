import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = (props) => {
  const userCtx = useContext(CurrentUserContext);
  const isOwn = props.card.owner === userCtx._id;
  const isLiked = props.card.likes.some((i) => i === userCtx._id);

  const cardLikeButtonClassName = `elements__heart ${
    isLiked && 'elements__heart_liked'
  }`;

  const handleClick = () => {
    props.onCardClick(props.card);
  };
  const handleLikeClick = () => {
    props.onLikeClick(props.card);
  };
  const handleDeleteClick = () => {
    props.onDeleteClick(props.card);
  };

  return (
    <li className='elements__element'>
      <img
        className='elements__image'
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          type='button'
          className='elements__trashcan'
          aria-label='Удалить'
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className='elements__caption'>
        <h2 className='elements__name'>{props.card.name}</h2>
        <div className='elements__likes'>
          <button
            type='button'
            className={cardLikeButtonClassName}
            aria-label='Нравится'
            onClick={handleLikeClick}
          ></button>
          <p className='elements__likes-qty'>{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
};

export default Card;
