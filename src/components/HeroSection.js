import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { Button1 } from './Button1';
import  video2 from './video2.mp4';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src={video2} autoPlay loop muted />
      <h1>Choose a career that you love</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button1
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'  style={{ color: 'white' }}
        >
          Register
        </Button1>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('SIGNIN')}
        >
         Sign In<i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;