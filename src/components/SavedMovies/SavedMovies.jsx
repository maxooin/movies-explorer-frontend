import React, {useContext} from 'react';
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import Preloader from "../Movies/Preloader/Preloader";

const SavedMovies = ({
                       isLoading,
                       isFailed,
                       cards,
                       isShortMovies,
                       setIsShortMovies,
                       handleShortMovies,
                       handleDeleteMovies,
                       handleSearchSavedMovies,
                       savedCards
                     }) => {

  const {currentUser} = useContext(CurrentUserContext);

  const moviesIdList = savedCards.map((item) => (item.owner === currentUser._id) ? item.movieId : []);
  const cardsSaved = cards.filter((item) => moviesIdList.indexOf(item.movieId) >= 0);
  const isFound = cards.length === cardsSaved.length ? true : cardsSaved.length > 0;
  let message;

  if (isFailed) {
    message = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
  } else if (!isFound) {
    message = 'Ничего не найдено'
  } else {
    message = ''
  }
  return (
    <div>
      <SearchForm isShortMovies={isShortMovies}
                  setIsShortMovies={setIsShortMovies}
                  handleShortMovies={handleShortMovies}
                  handleSearchSavedMovies={handleSearchSavedMovies} />
      <div className='movies__preloader-container'>
        {isLoading && <Preloader />}
        {!isLoading && (!isFound || isFailed) && (
          <p className='movies__message'>{message}</p>
        )}
      </div>
      <MoviesCardList cards={cardsSaved}
                      handleDeleteMovies={handleDeleteMovies}
                      savedCards={savedCards} />
    </div>
  );
};

export default SavedMovies;
