import React from 'react';
import logo from './turb-removebg-preview (1).png'

function Hero() {
  return (
    <div className="hero">
      <img className="title" src={logo} alt="Title" />
      <div className="buttons">
        <a href="./" className="button">Start</a>
        <a href="./custom" className="button">Customize</a>
      </div>
    </div>
  );
}

export default Hero;
