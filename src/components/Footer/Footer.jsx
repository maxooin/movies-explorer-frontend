import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
        <ul className='footer__lists'>
          <li>
            <a className='footer__link'
               href="https://practicum.yandex.ru"
               target='_blank'>Яндекс.Практикум</a>
          </li>
          <li>
            <a className='footer__link'
               href="https://github.com/maxooin"
               target='_blank'>Github</a>
          </li>
        </ul>
        <p className='footer__date'>&copy;{ new Date().getFullYear() }</p>
      </div>
    </footer>
  );
};

export default Footer;
