import React, { useEffect, useState } from 'react';
import yellow from './cars/yellowcar.png';
import orange from './cars/orangecar.png';
import police from './cars/policecar.png';
import red from './cars/redcar.png';
import './custom.css';

function Custom() {
  const [selectedBox, setSelectedBox] = useState(null);

  useEffect(() => {
    const boxes = document.querySelectorAll('.box');
    const images = document.querySelectorAll('.image-display img');
    const carTitle = document.querySelector('.car-title');

    function handleClick(index) {
      setSelectedBox(index);

      // Hide all images
      images.forEach((image) => (image.style.display = 'none'));

      // Show the corresponding image
      images[index].style.display = 'block';

      // Update car title
      switch (index) {
        case 0:
          carTitle.textContent = 'Corvette';
          break;
        case 1:
          carTitle.textContent = 'Piglet Vehicle';
          break;
        case 2:
          carTitle.textContent = 'Lambo';
          break;
        case 3:
          carTitle.textContent = 'Grocery Getta';
          break;
        default:
          carTitle.textContent = 'Car Title';
          break;
      }
    }

    boxes.forEach((box, index) => {
      box.addEventListener('click', () => handleClick(index));
    });

    return () => {
      boxes.forEach((box, index) => {
        box.removeEventListener('click', () => handleClick(index));
      });
    };
  }, []);

  function saveo(car) {
    localStorage.setItem('car', car);
  }

  return (
    <div>
      <a href="/app" className="home-button">
        Start
      </a>
      <div className="container">
        <div className="boxes">
          <button
            onClick={() => {
              saveo(0);
              setSelectedBox(0);
            }}
            className={`box ${selectedBox === 0 ? 'selected' : ''}`}
            id="box1"
          >
            <img id="img1" className="img" src={yellow} alt="Yellow Car" />
          </button>
          <button
            onClick={() => {
              saveo(1);
              setSelectedBox(1);
            }}
            className={`box ${selectedBox === 1 ? 'selected' : ''}`}
            id="box2"
          >
            <img id="img2" className="img" src={police} alt="Police Car" />
          </button>
          <button
            onClick={() => {
              saveo(2);
              setSelectedBox(2);
            }}
            className={`box ${selectedBox === 2 ? 'selected' : ''}`}
            id="box3"
          >
            <img id="img3" className="img" src={red} />
          </button>
          <button
            onClick={() => {
              saveo(3);
              setSelectedBox(3);
            }}
            className={`box ${selectedBox === 3 ? 'selected' : ''}`}
            id="box4"
          >
            <img id="img4" className="img" src={orange} alt="Orange Car" />
          </button>
        </div>
        <div className="image-display">
          <div className="header">
        <h2 className="car-title"></h2>
      </div>
          <img id="image1" src={yellow} alt="Yellow Car" />
          <img id="image2" src={police} alt="Police Car" />
          <img id="image3" src={red} alt="Red Car" />
          <img id="image4" src={orange} alt="Orange Car" />
        </div>
      </div>
    </div>
  );
}

export default Custom;
