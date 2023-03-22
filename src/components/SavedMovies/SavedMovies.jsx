import React from 'react';
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

const SavedMovies = () => {
  return (
    <div>
      <SearchForm />
      <MoviesCardList />
    </div>
  );
};

export default SavedMovies;
