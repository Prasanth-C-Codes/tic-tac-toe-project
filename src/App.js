import React, { useState } from "react";
import Square from "./component/Square";

export default function Board() {
  const [squares, setsquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    // Check if the square is already filled in or if there is a winner.
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // Update the squares array to reflect the player's move.
    setsquares((prevsquares) => {
      const nextsquares = prevsquares.slice(); //slice used for immutability meaning original array is unchanged.
      nextsquares[i] = xIsNext ? "X" : "O";
      return nextsquares;
    });
    // Change the value of the xIsNext variable.
    setXIsNext(!xIsNext);
  }
  //Display Winner
  const winner = calculateWinner(squares); //winner is either X or O value returned by this function.
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  const handlePlayAgain = () => {
    // Reset the game.
    squares.fill(null);
    setXIsNext(!xIsNext);
  };
  const playAgainButton = (
    <button onClick={handlePlayAgain}>Play Again</button>
  );
  return (
    <div className="container">
      <h1>Tic-Tac-Toe</h1>
      <div>
      {squares.every((square) => square === null) ? null : playAgainButton}
      </div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      {/* 
        An alternate way to do that, but we get 9 div tags.
        {squares.map((boxNo, index) => (
        <div
          key={index}
          className={index === 2 || index === 5 ? "board-row" : ""}
        >
          <Square value={boxNo} onSquareClick={() => handleClick(index)} />
        </div>
      ))}
      */}
      <div className="status">{status}</div>
    </div>
  );
}

//Winner Function.
function calculateWinner(squares) {
  //winning combinations.
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // Check if the three squares in the line are all the same value.
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // Return the value of the squares - to show who won. 'a' can also be either X or O.
      return squares[a];
    }
  }
  // Return null if there is no winner & the game continues..
  return null;
}
