import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

export const useDice = (callBack) => {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const rollRef = useRef(null);

  const gameWon = dice.every(
    (die) => die.value === dice[0].value && die.isHeld
  );

  function generateAllNewDice() {
    return new Array(10).fill({}).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function handleRoll(gameWon) {
    gameWon ? resetGame() : rollDice();
  }

  function resetGame() {
    if ('resetGame' in callBack) {
      callBack.resetGame();
      setDice(generateAllNewDice());
    }
  }

  function rollDice() {
    if ('rollDice' in callBack) {
      callBack.rollDice();
    }
    setDice((prev) =>
      prev.map((die) =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      )
    );
  }

  function hold(id, gameWon) {
    if (gameWon) {
      return;
    }
    setDice((prev) =>
      prev.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    );
  }

  useEffect(() => {
    if (gameWon) {
      rollRef.current.focus();
    }
  }, [gameWon]);

  return { dice, handleRoll, hold, gameWon, rollRef };
};
