import React from 'react';
import diceOne from '../assets/dice/dice-six-faces-one.png';
import diceTwo from '../assets/dice/dice-six-faces-two.png';
import diceThree from '../assets/dice/dice-six-faces-three.png';
import diceFour from '../assets/dice/dice-six-faces-four.png';
import diceSix from '../assets/dice/dice-six-faces-six.png';
import diceFive from '../assets/dice/dice-six-faces-five.png';

const Die = ({ value, isHeld, hold }) => {
  const styles = {
    backgroundColor: isHeld ? '#59E391' : '#FFFFFF',
  };

  const diceImage = () => {
    switch (value) {
      case 1:
        return diceOne;
      case 2:
        return diceTwo;
      case 3:
        return diceThree;
      case 4:
        return diceFour;
      case 5:
        return diceFive;
      default:
        return diceSix;
    }
  };

  return (
    <button
      className="die-button"
      style={styles}
      onClick={hold}
      aria-pressed={isHeld}
      aria-label={`Die with value ${value}, ${isHeld ? 'held' : 'not held'}`}
    >
      <img src={diceImage()} />
    </button>
  );
};

export default Die;
