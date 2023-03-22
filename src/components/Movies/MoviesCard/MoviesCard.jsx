import React, { useState } from 'react';
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import { useLocation } from "react-router-dom";

const MoviesCard = ({ card, handleSaveFilm }) => {

  const currentUser = React.useContext(CurrentUserContext).currentUser;

  const location = useLocation()
  const isSavedMovies = location.pathname === '/saved-movies'

  const [isSaved, setIsSave] = useState(card.owner.some((user) => user === currentUser._id))
  const cardLikeButtonClassName = (`movies-card__save-button ${ isSaved ? 'movies-card__save-button_active' : '' }`);

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60)
    let minutes = mins % 60
    return hours + 'ч ' + minutes + 'м'
  }

  const handleClick = () => {
    setIsSave(!isSaved)
    if (!isSaved) {
      handleSaveFilm(card)
    }
  }

  return (
    <article className='movies-card'>
      <div className='movies-card__info'>
        <div className='movies-card__texts'>
          <h3 className='movies-card__title'>{ card.nameRU }</h3>
          <p className='movies-card__time'>{ getTimeFromMins(card.duration) }</p>
        </div>
        { isSavedMovies ? (
          <button onClick={ handleClick } className='movies-card__delete-button' />
        ) : (
          <button onClick={ handleClick } className={ cardLikeButtonClassName } />
        ) }
      </div>
      <a className='movies-card__link' href={ card.trailerLink } target='_blank'>
        <img className="movies-card__image" src={ card.image.url } alt={ card.image.name } />
      </a>
    </article>
  );
};

export default MoviesCard;
