import { useState } from 'react';
import './App.css';
import { SECRET_LEN, NUM_GUESSES, generateSecret, uniqDigits, resultOf } from './game';
import 'milligram';

function App() {
  const [randomNum, setRandomNum] = useState(generateSecret());
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);

  // Reset state to empty, and generate a new secret number
  function resetGame() {
    setRandomNum(generateSecret());
    setGuesses([]);
    setGuess("");
  }

  // Update the input field text, keeping only unique digits
  function updateGuess(ev) {
    setGuess(uniqDigits(ev.target.value).substring(0, SECRET_LEN));
  }

  // Make a guess if enter is pressed, and backspace when backspace is pressed
  function keypress(ev) {
    if (ev.key == "Enter" && guess.length === 4) {
      makeGuess();
    }
    if (ev.key == "Backspace" && guess.length > 0) {
      setGuess(guess.substring(0, guess.length));
    }
  }

  // Add the new guess to the guesses state, then reset the current guess 
  function makeGuess() {
    setGuesses(guesses.concat(guess));
    setGuess("");
  }

  // Render all NUM_GUESSES rows and guesses/results
  function guessGrid() {
    let guessRows = [];
    const numGuesses = guesses.length;

    for(let i = 1; i <= NUM_GUESSES; i++) {
      guessRows.push(
        <div className="row"  key={i}>
          <div className="column align-right">
            <strong>{i}</strong>
          </div>
          <div className="column">
            {numGuesses < i ? "" : guesses[i - 1]}
          </div>
          <div className="column">
            {numGuesses < i ? "" : resultOf(guesses[i - 1], randomNum)}
          </div>
        </div>
      );
    }

    return guessRows;
  }

  // Render the game status message (empty until game is over)
  function statusMessage() {
    if (guesses[guesses.length-1] === randomNum) {
      return <h1>You Win!</h1>;
    }
    if (guesses.length === NUM_GUESSES) {
      return (
        <div>
          <h1>You Lose.</h1>
          <p>The secret number was {randomNum}</p>
        </div>
      );
    }
    return <p>&nbsp;</p>;
  }

  return (
    <div className="bulls-and-cows">
      <div className="container">
        <div className="row">
          <div className="column align-right">
            <h3>Input:</h3>
          </div>
          <div className="column">
            <input type="text"
                   value={guess}
                   onChange={updateGuess}
                   onKeyDown={keypress}
                   disabled={guesses.length === NUM_GUESSES || guesses[guesses.length-1] === randomNum}/>
          </div>
          <div className="column align-left">
            <button disabled={guess.length !== SECRET_LEN} onClick={() => makeGuess()}>Guess</button>
          </div>
        </div>
        <div className="row">
          <div className="column"></div>
          <div className="column">
            <strong>Guess</strong>
          </div>
          <div className="column">
            <strong>Result</strong>
          </div>
        </div>
        {guessGrid()}
        {statusMessage()}
        <button className="button-outline" disabled={guesses.length === 0} onClick ={() => resetGame()}>Reset</button>
      </div>
    </div>
  );
}

export default App;
