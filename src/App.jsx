import { useEffect } from 'react';
import { useTracker } from './hooks/useTrackers.js';
import { useWindowSize } from './hooks/useWindowSize.js';
import { useDice } from './hooks/useDice.js';
import Die from './components/Die.jsx';
import Confetti from 'react-confetti';

function App() {
  const { windowSize } = useWindowSize();
  const {
    rollCount,
    seconds,
    resetTracker,
    incrementRollCount,
    startTimer,
    stopTimer,
  } = useTracker();
  const { dice, handleRoll, hold, gameWon, rollRef } = useDice({
    resetGame: resetTracker,
    rollDice: incrementRollCount,
  });

  useEffect(() => {
    if (!gameWon) {
      startTimer();
    }
    return stopTimer;
  }, [gameWon]);

  return (
    <main>
      {gameWon && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}
      <div className="sr-only" aria-live="polite">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <section className="game-tracker">
        <h3>Count: {rollCount}</h3>
        <h3>Timer: {seconds}</h3>
      </section>
      <div className="die-container">
        {dice.map((die) => (
          <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            hold={() => hold(die.id, gameWon)}
          />
        ))}
      </div>
      <button
        ref={rollRef}
        className="roll-butt"
        onClick={() => handleRoll(gameWon)}
      >
        {gameWon ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
}

export default App;
