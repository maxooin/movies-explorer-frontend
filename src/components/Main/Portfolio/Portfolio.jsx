import React from 'react';

const Portfolio = () => {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__lists'>
        <li className='portfolio__list'>
          <a className='portfolio__link'
             href="https://maxooin.github.io/how-to-learn/"
             target='_blank'>Статичный сайт <span className='portfolio__icon'>↗</span></a>
        </li>
        <li className='portfolio__list'>
          <a className='portfolio__link'
             href="https://maxooin.github.io/russian-travel/"
             target='_blank'>Адаптивный сайт <span className='portfolio__icon'>↗</span></a>
        </li>
        <li className='portfolio__list'>
          <a className='portfolio__link'
             href="https://maxooin.github.io/mesto/"
             target='_blank'>Одностраничное приложение <span className='portfolio__icon'>↗</span></a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
