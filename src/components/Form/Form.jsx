import React from 'react';
import logo from '../../images/logo/logo.svg'
import {Link, useLocation} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

const Form = ({children, title, textbtn, handleSubmit, isValid, initialState}) => {

  const {commonError} = React.useContext(CurrentUserContext);

  const location = useLocation();

  const isRegister = location.pathname === '/signup';

  return (
    <section className="form__container">
      <Link className='form__logo-link' to='/'>
        <img src={logo} alt="Логотип" />
      </Link>
      <h2 className='form__title'>{title}</h2>
      <form className='form' onSubmit={handleSubmit}>
        {children}
        <div className={`form__button-container ${isRegister ? 'form__button-container_register' : ''}`}>
          <p className='form__error'>{initialState ? commonError : ''}</p>
          <button className='form__button'
                  disabled={isValid ? '' : 'disabled'}
          >{textbtn}</button>
        </div>
        {isRegister ? (
          <p className='form__subtext'>Уже зарегистрированы?
            <Link className='form__link' to='/signin'>Войти</Link></p>
        ) : (
          <p className='form__subtext'>Ещё не зарегистрированы?
            <Link className='form__link' to='/signup'>Регистрация</Link>
          </p>
        )}
      </form>
    </section>
  );
};

export default Form;
