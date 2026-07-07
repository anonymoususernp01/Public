import { useState } from 'react';
import { Square } from './Square';

export function Board() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [next, setNext] = useState(true );

  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  let winner = null;
  for(let i=0; i<winConditions.length;i++){
    const [a,b,c] = winConditions[i];

    if(board[a] && board[a] === board[b] && board[a] === board[c]){
      winner = board[a];
      break;
    }
  }
  const isDraw = !winner && board.every(square => square !== null)

  let status;
  if(winner) status=`Winner: ${winner}`
  else if(isDraw) status='Draw'
  else status = `Next Player: ${next ? 'X' : 'O'}`
  
  function handleClick(index){

    if(board[index] || winner) return;

    const squares = board.slice();

    // if(board[index]) return;
    if(next) squares[index] = 'X';
    else squares[index] = "O";

    setBoard(squares);
    setNext(!next);
  }

  function handleReset(){
    setBoard(Array(9).fill(null));
    setNext(true);
  }

  return(
    <div className="game-container">
      <h2 className="status">{status}</h2>
      <div className="board-grid">
        {board.map((square,index) => {
            return(
                <Square key={index} value={square} onClick={() => handleClick(index)} />
            );
        })}

        {/* <button className="square" onClick={() => handleClick(0)}>{board[0]}</button>
        <button className="square" onClick={() => handleClick(1)}>{board[1]}</button>
        <button className="square" onClick={() => handleClick(2)}>{board[2]}</button>
        <button className="square" onClick={() => handleClick(3)}>{board[3]}</button>
        <button className="square" onClick={() => handleClick(4)}>{board[4]}</button>
        <button className="square" onClick={() => handleClick(5)}>{board[5]}</button>
        <button className="square" onClick={() => handleClick(6)}>{board[6]}</button>
        <button className="square" onClick={() => handleClick(7)}>{board[7]}</button>
        <button className="square" onClick={() => handleClick(8)}>{board[8]}</button> */}

      </div>
      <button id="reset" onClick={handleReset}>Reset</button>
    </div>
  )
}