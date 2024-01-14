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
    const [xTurn, setXTurn] = useState()
    const [oTurn, setOTurn] = useState()
    const [status, setStatus] = useState();
    const { turn } = useParams();
    const [stepNumber, setStepNumber] = useState(0);
    const initial = () => {
        if (turn === 'X') {
            setXTurn(turn)
            setOTurn('O');
            setStatus('X');
        } else {
            setXTurn('X')
            setOTurn(turn);
            setStatus('O');
        }

        alert(xTurn, oTurn, status)
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

        //newSquares[i] = xIsNext ? 'X' : 'O';
        newSquares[i] = xIsNext ? xTurn : oTurn;
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
    //  const status = winner
    //      ? `Winner: ${winner}`
    //      : xIsNext ? xTurn : oTurn;

    //const status = xIsNext ? xTurn : oTurn;

    useEffect(() => {
        setStatus(xIsNext ? xTurn : oTurn);
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
    //     if (!xIsNext) {          
    //       const timeoutId = setTimeout(() => {
    //         const emptySquares = squares.reduce((acc, value, index) => {
    //           if (value === null) {
    //             acc.push(index);
    //           }
    //           return acc;
    //         }, []);
    
    //         const randomIndex = Math.floor(Math.random() * emptySquares.length);
    //         const computerMove = emptySquares[randomIndex];
    // console.log(emptySquares)
    // alert("ooooooooo")
    //         const newHistory = squares.slice(0, stepNumber + 1);
    //         const newSquare = squares.slice();
    //         newSquare[computerMove] = 'O';
    // console.log(newSquare)
    //         setSquares([...newHistory, newSquare]);
    //         //setSquares([newSquare]);
    //         setStepNumber(newHistory.length);
    //         setXIsNext(!xIsNext);
    //         console.log(squares)
    //       }, 500); // Delay of 500 milliseconds for a more natural feel
    
    //       return () => clearTimeout(timeoutId);
    //     }
      }, [xIsNext, squares, xIsNext]);

    return (
        <div className='board'>
            {isPopupOpen && <PopupWin closePopup={closePopup} setShow={setShow} />}
            <div className='board-row'>
                <div className='player-xo'><span className='x'>X</span><span className='o'>O</span></div>
                <div className="status">{userTurn ? status : turn}</div>
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