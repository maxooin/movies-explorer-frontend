import logo from '../../images/logo/logo.svg'
import { Link } from "react-router-dom";

const Header = ({ loggedIn }) => {
  return (
    <header className='header'>
      <img src={ logo } alt='Logo'/>
      { loggedIn ? (
          <div>
            <Link to='/'></Link>
            <Link to='/'></Link>
          </div>
        )
        : (
          <nav className='header__nav'>
            <Link className='header__sing-up header__link' to='/'>Регистрация</Link>
            <Link className='header__sing-in header__link' to='/'>Войти</Link>
          </nav>
        ) }
    </header>
  );
};

export default Header;
