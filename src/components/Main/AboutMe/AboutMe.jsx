import React from 'react';
import me from '../../../images/me.jpg'

const AboutMe = () => {
  return (
    <section className='about-me' id='about'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__container'>
        <img className='about-me__image' src={ me } alt="Михаил" />
        <div className='about-me__text-container'>
          <h3 className='about-me__subtitle'>Михаил</h3>
          <h4 className='about-me__text'>Инженер-программист, 27 лет</h4>
          <p className='about-me__subtext'>Я родился и живу в Санкт-Петербурге. Я люблю слушать музыку, а ещё
            увлекаюсь сноубордом. Недавно начал
            кодить. За время учёбы смог найти работу по новой профессии и сделать один фриланс.
          </p>
          <a className='about-me__link' href='https://github.com/maxooin' target='_blank'>GitHub</a>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
