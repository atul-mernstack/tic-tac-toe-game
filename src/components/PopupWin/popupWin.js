import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './popupWin.css';

export const PopupWin=({closePopup,setShow})=>{
    const navigate=useNavigate();
    const {turn}=useParams();
    const handleQuit=()=>{
        closePopup();        
        setShow(false);
        navigate(`/game/${turn}`);
        localStorage.setItem('X',0);
        localStorage.setItem('T',0);
        localStorage.setItem('O',0);
    }
    const handleNextRound=()=>{
        setShow(true);      
        closePopup();
        navigate(`/game/${turn}`);
    }
    return(
       <div className='popupwin'>
        {/* <div className='won'> */}
            <h3>YOU WON</h3>
        {/* </div> */}
        <div className='takes-the-round'>
            <h2>O TAKES THE ROUND</h2>
        </div>
        <div className='quit-n-next-btn'>
            <div ><button className='quit-t' onClick={()=>handleQuit()}>QUIT</button></div>            
            <div ><button className='next-round' onClick={handleNextRound}>NEXT ROUND</button></div>
        </div>
       </div>
    )
}