import React from 'react';
import search_icon from '../../../images/search_icon.svg'

const SearchForm = () => {
  return (
    <div className='search'>
      <div className='search__input-container'>
        <input className='search__input' type="search" placeholder='Фильм' />
        <img className='search__image' src={ search_icon } alt="Поиск" />
      </div>
      <div className='search__toggle-container'>
        <p className='search__text'>Короткометражки</p>
        <input className='search__toggle' type="checkbox" />
      </div>
    </div>
  );
};

export default SearchForm;
