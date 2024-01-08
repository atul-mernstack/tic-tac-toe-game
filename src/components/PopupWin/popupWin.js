import React from 'reatc';
import { useNavigate } from 'react-router-dom';
import './popup.css';

export const PopupWin=()=>{
    const navigate=useNavigate();
    const handleQuit=()=>{
        navigate('/game');
    }
    const handleNextRound=()=>{
        navigate('/game');
    }
    return(
       <div className='popup'>
        <div>
            <h3>YOU WON</h3>
        </div>
        <div>
            <h2>TAKES THE ROUND</h2>
        </div>
        <div>
            <div><button onClick={handleQuit}>QUIT</button></div>            
            <div><button onClick={handleNextRound}>NEXT ROUND</button></div>
        </div>
       </div>
    )
}