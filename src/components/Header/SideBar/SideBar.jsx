import React from 'react';
import { Link, NavLink } from "react-router-dom";
import account_icon from "../../../images/account_icon.svg";

const SideBar = ({ isOpen, handleClick }) => {
  return (
    <div className={ `sidebar ${ isOpen ? 'sidebar_opened' : '' }` }>
      <div className='sidebar__container'>
        <button className='sidebar__button-close' onClick={ handleClick } />
        <nav className='sidebar__navigation'>
          <div className='sidebar__navigation-container'>
            <NavLink onClick={ handleClick }
                     className={ ({ isActive }) => isActive ? 'sidebar__link_active' : 'sidebar__link' }
                     to='/'>Главная</NavLink>
            <NavLink onClick={ handleClick }
                     className={ ({ isActive }) => isActive ? 'sidebar__link_active' : 'sidebar__link' }
                     to='/movies'>Фильмы</NavLink>
            <NavLink onClick={ handleClick }
                     className={ ({ isActive }) => isActive ? 'sidebar__link_active' : 'sidebar__link' }
                     to='/saved-movies'>Сохранённые
              фильмы</NavLink>
          </div>
          <Link onClick={ handleClick }
                className='sidebar__profile-button' to='/profile'>
            Аккаунт <img className='sidebar__icon'
                         src={ account_icon }
                         alt='Logo' /></Link>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
