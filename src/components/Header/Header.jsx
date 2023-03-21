import logo from '../../images/logo/logo.svg'
import { Link } from "react-router-dom";

const Header = ({ loggedIn }) => {
  return (
    <header className='header'>
      <img src={ logo } alt='Logo' />
      { loggedIn ? (
          <nav>
            <Link className='header__link' to='/'>Фильмы</Link>
            <Link className='header__link' to='/'>Сохранённые фильмы</Link>
          </nav>
        )
        : (
          <nav className='header__nav'>
            <Link className='header__sing-up header__link' to='/signup'>Регистрация</Link>
            <Link className='header__sing-in header__link' to='/signin'>Войти</Link>
          </nav>
        ) }
    </header>
  );
};

export default Header;
