import logo from '../../images/logo/logo.svg'
import account_icon from '../../images/account_icon.svg'
import { Link, NavLink, useLocation } from "react-router-dom";
import SideBar from "./SideBar/SideBar";
import { useState } from "react";

const Header = ({ loggedIn }) => {

  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const isNotShow = location.pathname === '/signup' || location.pathname === '/signin' || location.pathname === '/not-found'

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      { isNotShow ? undefined : (
        <header className='header'>
          <Link to='/'>
            <img src={ logo } alt='Logo' />
          </Link>
          { loggedIn ? (
            <div>
              <nav className='header__navigation'>
                <div>
                  <NavLink className={ ({ isActive }) => isActive ? 'header__link_active' : 'header__link' }
                           to='/movies'>Фильмы</NavLink>
                  <NavLink className={ ({ isActive }) => isActive ? 'header__link_active' : 'header__link' }
                           to='/saved-movies'>Сохранённые фильмы</NavLink>
                </div>
                <Link className='header__profile-button' to='/profile'>Аккаунт <img className='header__icon'
                                                                                    src={ account_icon }
                                                                                    alt='Logo' /></Link>
              </nav>
              <button className='header__burger' onClick={ handleClick } />
              <SideBar isOpen={ isOpen } handleClick={ handleClick } />
            </div>
          ) : (
            <nav className='header__nav'>
              <Link className='header__sing-up header__link' to='/signup'>Регистрация</Link>
              <Link className='header__sing-in header__link' to='/signin'>Войти</Link>
            </nav>
          ) }
        </header>
      ) }
    </>
  );
};

export default Header;
