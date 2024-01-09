import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import './popup.css';
export const Popup=({ onClose,setShow })=>{
    const navigate=useNavigate();
    const {turn} =useParams();
    const handlePlayAgain=()=>{
        setShow(true);
        navigate(`/game/${turn}`);
        onClose();
    }

    const handleQuit=()=>{
        setShow(false);
        navigate(`/game/${turn}`);
        onClose();
    }

    return(
        <div className="popup">
            <div className="heading">
            <h1>Do you want to quit?</h1>
            </div>            
            <div className="playagain-n-quit-btn">
                <div><bitton className="play-again-btn" onClick={handlePlayAgain}>PLAY AGAIN</bitton></div>
                <div><bitton className="quit-btn" onClick={handleQuit}>QUIT</bitton></div>
            </div>
        </div>
    )
}
