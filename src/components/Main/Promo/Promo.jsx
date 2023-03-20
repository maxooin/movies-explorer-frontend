import React from 'react';
import landing_image from '../../../images/landing_image.svg'

const Promo = () => {
  return (
    <section className='promo'>
      <div className='promo__container'>
        <img className='promo__image' src={ landing_image } alt="Landing promo" />
        <div>
          <h1 className='promo__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
      </div>
      <a className='promo__link' href='#about'>Узнать больше</a>
    </section>
  );
};

export default Promo;
