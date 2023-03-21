import React from 'react';
import logo from '../../images/logo/logo.svg'
import { Link, useLocation } from "react-router-dom";

const Form = ({ children, title, textbtn, handleSubmit, isValid }) => {

  const location = useLocation();

  const isRegister = location.pathname === '/signup';

  return (
    <section className="form__container">
      <img src={ logo } alt="Логотип" />
      <h2 className='form__title'>{ title }</h2>
      <form className='form' onSubmit={ handleSubmit }>
        { children }
        <button className="form__button"
                disabled={ isValid ? '' : 'disabled' }
        >{ textbtn }</button>
        { isRegister ? (
          <p className='form__subtext'>Уже зарегистрированы?
            <Link className='form__link' to='/signin'>Войти</Link></p>
        ) : (
          <p className='form__subtext'>Ещё не зарегистрированы?
            <Link className='form__link' to='/signup'>Регистрация</Link>
          </p>
        ) }
      </form>
    </section>
  );
};

export default Form;
