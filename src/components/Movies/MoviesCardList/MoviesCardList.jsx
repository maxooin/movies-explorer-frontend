import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({
                          cards,
                          handleButtonMoreClick,
                          handleDeleteMovies,
                          handleSaveMovies,
                          isButtonMoreDisplayed,
                          savedCards,
                          loggedIn
                        }) => {

  return (
    <div className='movies-card-list'>
      <div className='movies-card-list__container'>
        {cards.map((card) => (
          <MoviesCard key={card.movieId}
                      card={card}
                      handleDeleteMovie={handleDeleteMovies}
                      handleSaveMovie={handleSaveMovies}
                      saveCards={savedCards}
                      loggedIn={loggedIn} />
        ))}
      </div>
      {isButtonMoreDisplayed ? (
        <button className='movies-card-list__button' onClick={handleButtonMoreClick}>Ещё</button>
      ) : undefined}
    </div>
  );
};

export default MoviesCardList;
