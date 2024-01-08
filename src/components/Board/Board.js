import React, { useState } from 'react';
import { Square } from '../Square/Square';
import {Popup} from '../popup/Popup';
import './Board.css';
import { useParams } from 'react-router-dom';

export const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const {turn}=useParams();
   
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

    const winner = calculateWinner(squares);
    const status = winner
        ? `Winner: ${winner}`
        : `Turn: ${xIsNext ? 'X' : 'O'}`;

        
    const handleRefresh=()=>{
        setIsPopupOpen(true);
    }

    const closePopup = () => {
        setIsPopupOpen(false);
      };

    return (
        <div>
            {isPopupOpen && <Popup onClose={closePopup} />}
            <div className='board-row'>
            <div className='player'>XO</div>
            <div className="status">{status}</div>
            <div className='refresh'>
                <button onClick={handleRefresh}>rf</button>
                
                </div>
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
            <div className='results'>
            <div className='resultx'>You</div>
            <div className='resultt'>Tie</div>
            <div className='resulto'>Cpu</div>
            </div>
        </div>

    )
}