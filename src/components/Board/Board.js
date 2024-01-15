import React, { useEffect, useState } from 'react';
import { Square } from '../Square/Square';
import { Popup } from '../popup/Popup';
import { PopupWin } from '../PopupWin/popupWin';
import './Board.css';
import { useParams } from 'react-router-dom';

export const Board = ({ handleRefresh, show, setShow, reset }) => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [userTurn, setUserTurn] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [win, setWin] = useState();
    const [uTurn, setUTurn] = useState()
    const [cTurn, setCTurn] = useState()
    const [status, setStatus] = useState();
    const { turn } = useParams();
    
    const initial = () => {
        if (turn === 'X') {
            setUTurn(turn)
            setCTurn('O');
            setStatus('X');
        } else if(turn==='O') {
            setUTurn(turn)
            setCTurn('X');
            setStatus('O');
        }

    }

    useEffect(() => {
        initial();
    }, []);

    useEffect(() => {
        if (reset) {
            initial();
            setSquares(Array(9).fill(null));
        }
    }, [reset]);

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

        return squares.every(square => square !== null) ? 'Tie' : null;
    };

    const handleClick = (i) => {
        setShow(true)
        setUserTurn(true);
        const newSquares = squares.slice();
        if (calculateWinner(newSquares) || newSquares[i]) {
            return;
        }

        
        //newSquares[i] = xIsNext ? xTurn : oTurn;
        newSquares[i] = uTurn;
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    };

    const renderSquare = (i) => (
        <Square value={squares[i]} onClick={() => handleClick(i)} />
    );




    let winner = calculateWinner(squares);

    useEffect(() => {
        if (winner) {
            if (winner === 'X') {
                const xScore = Number(localStorage.getItem('X'));
                localStorage.setItem("X", xScore + 1)
            } else if (winner === 'O') {
                const oScore = Number(localStorage.getItem('O'));
                localStorage.setItem("O", oScore + 1)
            } else {
                const tScore = Number(localStorage.getItem('T'));
                localStorage.setItem("T", tScore + 1)
            }
            setIsPopupOpen(true);
            setWin(winner);
        }
    }, [winner]);
 
    useEffect(() => {
        setStatus(xIsNext ? uTurn : cTurn);

    }, [xIsNext])




    const closePopup = () => {
        setSquares(Array(9).fill(null))
        setIsPopupOpen(false);
        setWin(0);
        initial();
        if (!show) {
            localStorage.setItem('X', 0);
            localStorage.setItem('T', 0);
            localStorage.setItem('O', 0);
        };
    }


    useEffect(() => {
         if (!xIsNext) {          
           const timeoutId = setTimeout(() => {
             const emptySquares = squares.reduce((acc, value, index) => {
               if (value === null) {
                 acc.push(index);
               }
               return acc;
             }, []);
    
             const randomIndex = Math.floor(Math.random() * emptySquares.length);
             const computerMove = emptySquares[randomIndex];

             squares[computerMove] = cTurn;;
           
             setXIsNext(!xIsNext);
          
           }, 1000);
    
          return () => clearTimeout(timeoutId);
        }
      }, [xIsNext, squares]);

    return (
        <div className='board'>
            {isPopupOpen && <PopupWin closePopup={closePopup} setShow={setShow} />}
            <div className='board-row'>
                <div className='player-xo'><span className='x'>X</span><span className='o'>O</span></div>
                <div className="status">{userTurn ? status : turn} : Turn</div>
                {show ? <div className='refresh'>
                    <button onClick={handleRefresh}><i style={{ fontSize: "24px", color: 'grey', border: 'none' }} class="fa">&#xf021;</i></button>

                </div> : ''}
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
            {show ? <div className='results'>
                <div className='resultx'>{turn}(You)<br />{localStorage.getItem(turn) ? localStorage.getItem(turn) : 0}</div>
                <div className='resultt'>Tie<br />{localStorage.getItem("T") ? localStorage.getItem("T") : 0}</div>
                <div className='resulto'>{turn === 'X' ? 'O' : 'X'}(Cpu)<br />{localStorage.getItem(turn === 'X' ? 'O' : 'X') ? localStorage.getItem(turn === 'X' ? 'O' : 'X') : 0}</div>
            </div> : ''}
        </div>

    )
}