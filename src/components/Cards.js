import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>It's not what you achieve, it's what you overcome. That's what defines your career </h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
          <CardItem
              src='images/img-3.jpg'
              text='Click here to find your  career path'
              label='Dream Career'
              path='/careerfinder'
            />
            <CardItem
              src='images/interest1.jpg'
              text='Click here to find your Interest Profiler Code '
              label='Interest Profiler'
              path='/personalitytest'
            />
            
          </ul>
          <ul className='cards__items'>
         
          <CardItem
              src='images/user.png'
              text='Go to your Profile'
              label='profile'
              path='/profile'
            />


            <CardItem
              src='images/img-4.jpg'
              text='Most Common Jobs'
              label='Jobs'
              path='/profession'
            />
            <CardItem
              src='images/img-3.jpg'
              text='Make sure you have the basic knowledge on the Career Path. Take the Test'
              label='Aptitude'
              path='/aptitude'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;