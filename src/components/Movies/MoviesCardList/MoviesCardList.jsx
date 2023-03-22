import React from 'react';
import { cardsAll } from "../../../utils/cards";
import MoviesCard from "../MoviesCard/MoviesCard";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

const MoviesCardList = () => {

  const currentUser = React.useContext(CurrentUserContext).currentUser;

  function handleSaveFilm(cardForSave) {
    cardForSave.owner.push(currentUser._id)
  }

  return (
    <div className='movies-card-list'>
      <div className='movies-card-list__container'>
        { cardsAll.map((card) => (
          <MoviesCard key={ card.id }
                      card={ card }
                      handleSaveFilm={ handleSaveFilm } />
        )) }
      </div>
      <button className='movies-card-list__button'>Ещё</button>
    </div>
  );
};

export default MoviesCardList;
