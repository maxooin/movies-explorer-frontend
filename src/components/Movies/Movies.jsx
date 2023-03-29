import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";

const Movies = ({
                  isLoading,
                  isFailed,
                  cards,
                  isButtonMoreDisplayed,
                  handleButtonMoreClick,
                  isShortMovies,
                  setIsShortMovies,
                  handleShortMovies,
                  handleDeleteMovies,
                  handleSaveMovies,
                  handleSearchMovies,
                  savedTextForSearch,
                  savedCards,
                  loggedIn
                }) => {
  let message;

  const isFound = savedTextForSearch ? cards.length > 0 : false;

  if (isFailed) {
    message = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
  } else if (!isFound) {
    message = 'Ничего не найдено'
  } else {
    message = ''
  }


  return (
    <section className='movies'>
      <SearchForm isShortMovies={isShortMovies}
                  setIsShortMovies={setIsShortMovies}
                  handleShortMovies={handleShortMovies}
                  handleSearchMovies={handleSearchMovies}
                  savedTextForSearch={savedTextForSearch} />
      <div className='movies__preloader-container'>
        {isLoading && <Preloader />}
        {!isLoading && (!isFound || isFailed) && (
          <p className='movies__message'>{message}</p>
        )}
      </div>
      {isFound && !isFailed && (
        <MoviesCardList cards={cards}
                        handleButtonMoreClick={handleButtonMoreClick}
                        isButtonMoreDisplayed={isButtonMoreDisplayed}
                        handleDeleteMovies={handleDeleteMovies}
                        handleSaveMovies={handleSaveMovies}
                        savedCards={savedCards}
                        loggedIn={loggedIn} />
      )}
    </section>
  );
};

export default Movies;
