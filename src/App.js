import { useState } from 'react';
import './App.css';
function Square({pos,value, onSquareClick}){
  return (
  <button className={pos} onClick={onSquareClick}>
    {value}
  </button>);
}

function findWinner(squares){
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for(let i = 0; i < lines.length; i++){
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}
export default function Board(){
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xNext, setXNext] = useState(true);

  const winner = findWinner(squares);
  let status ;
  if(winner){
    status = `Winner : ${winner}`;
  } else{
    if(squares.indexOf(null) === -1){
      status = "Draw";
    }
    else{
      status = `Next player : ${(xNext)? "X":"O"}`;
    }
  }
  
  function handleClick(i){
    if(squares[i]){
      alert("Square already Occupied!! \nSelect new square");
      return ;
    }
    if(findWinner(squares)){
      return ;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = (xNext)? "X":"O";
    setXNext(!xNext);
    setSquares(nextSquares);
  }
  return (
    <>
    <div className='setup'>
    <div className='board-row'>
      <Square pos = "square top left" value = {squares[0]} onSquareClick={() => handleClick(0)}/>
      <Square pos = "square top" value = {squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square pos = "square top right" value = {squares[2]} onSquareClick={() => handleClick(2)}/>
    </div>
    <div className='board-row'>
      <Square pos = "square left" value = {squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square pos = "square" value = {squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square pos = "square right" value = {squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>
    <div className='board-row'>
      <Square pos = "square bottom left" value = {squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square pos = "square bottom" value = {squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square pos = "square bottom right" value = {squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
    </div>
    <div className='status'>{status}</div>
</>
  );
}


