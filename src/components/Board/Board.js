import React, { useEffect, useState } from 'react';
import { Square } from '../Square/Square';
import { Popup } from '../popup/Popup';
import { PopupWin } from '../PopupWin/popupWin';
import './Board.css';
import { useParams } from 'react-router-dom';

export const Board = ({handleRefresh,show, setShow}) => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const[userTurn,setUserTurn]=useState(false);
    
    const { turn } = useParams();

    const calculateWinner = (squares) => {
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

        for (const line of lines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    };

    const handleClick = (i) => {
        setShow(true)
        setUserTurn(true);
        const newSquares = squares.slice();
        if (calculateWinner(newSquares) || newSquares[i]) {
            return;
        }

        newSquares[i] = xIsNext ? 'X' : 'O';
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    };

    const renderSquare = (i) => (
        <Square value={squares[i]} onClick={() => handleClick(i)} />
    );




     let winner = calculateWinner(squares);
     const status = winner
         ? `Winner: ${winner}`
         : `Turn: ${xIsNext ? 'X' : 'O'}`;

    


        const closePopup = () => {          
            winner=null;          
          };
    

    return (
        <div className='board'>
            {winner && <PopupWin closePopup={closePopup} setShow={setShow}/>}
            <div className='board-row'>
                <div className='player-xo'><span className='x'>X</span><span className='o'>O</span></div>
                <div className="status">{userTurn?status:turn}</div>
                {show?<div className='refresh'>
                    <button onClick={handleRefresh}><i style={{ fontSize: "24px", color: 'grey', border: 'none' }} class="fa">&#xf021;</i></button>

                </div>:''}
            </div>

            <div className='board-row'>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className='board-row'>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className='board-row'>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            {show?<div className='results'>
                <div className='resultx'>X(You)<br />0</div>
                <div className='resultt'>Tie<br />0</div>
                <div className='resulto'>O(Cpu)<br />0</div>
            </div>:''}
        </div>

    )
}