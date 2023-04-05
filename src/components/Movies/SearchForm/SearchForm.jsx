import React, {useState} from 'react';
import search_icon from '../../../images/search_icon.svg'
import {useLocation} from "react-router-dom";

const SearchForm = ({
                      isShortMovies,
                      setIsShortMovies,
                      handleSearchMovies,
                      handleShortMovies,
                      savedTextForSearch,
                      handleSearchSavedMovies
                    }) => {

  const location = useLocation();

  const [searchText, setSearchText] = useState("");
  const [searchError, setSearchError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(savedTextForSearch);

  const isSavedMovies = location.pathname === '/saved-movies'

  const handleToggleChange = () => {
    setIsShortMovies((state) => !state)
    handleShortMovies();
  }

  function handleSubmitButton(evt) {
    evt.preventDefault();

    if (searchText === undefined || searchText === "") {
      setIsButtonDisabled(true);
      setSearchError("Нужно ввести ключевое слово");
    } else if (isSavedMovies) {
      handleSearchSavedMovies(searchText)
    } else {
      handleSearchMovies(searchText)
    }
  }

  function handleSearchChange(evt) {
    setSearchError("");
    setSearchText(evt.target.value);
    setIsButtonDisabled(false);
  }

  return (
    <div className='search'>
      <form className='search__form' onSubmit={handleSubmitButton} noValidate>
        <div className='search__input-container'>
          <input className='search__input'
                 type="search"
                 id='movie'
                 name='movie'
                 minLength={2}
                 defaultValue={savedTextForSearch || ''}
                 values={searchText}
                 onChange={handleSearchChange}
                 placeholder='Фильм' />
          <button className='search__button'
                  disabled={isButtonDisabled ? 'disabled' : ''}>
            <img className='search__image' src={search_icon} alt="Поиск" />
          </button>
        </div>
        <div className='search__toggle-container'>
          <p className='search__text'>Короткометражки</p>
          <input className='search__toggle'
                 type="checkbox"
                 id='short-movies'
                 name='short-movies'
                 checked={isShortMovies}
                 onChange={handleToggleChange} />
        </div>
      </form>
      <span className='search__error'>{searchError}</span>
    </div>
  );
};

export default SearchForm;
