import React from 'react';
import { useNavigate } from "react-router-dom";

const NotFound = () => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <section className='not-found'>
      <h2 className='not-found__title'>404</h2>
      <p className='not-found__subtitle'>Страница не найдена</p>
      <button className='not-found__button'
              onClick={ handleClick }>Назад
      </button>
    </section>
  );
};

export default NotFound;
