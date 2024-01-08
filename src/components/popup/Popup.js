import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Popup=({ onClose })=>{
    const navigate=useNavigate();
    const {turn} =useParams();
    const handlePlayAgain=()=>{
        navigate(`/game/${turn}`);
        onClose();
    }

    const handleQuit=()=>{
        navigate(`/game/${turn}`);
        onClose();
    }

    return(
        <div>
            <h1>Do you want to quit?</h1>
            <div className="refres">
                <div><bitton onClick={handlePlayAgain}>PLAY AGAIN</bitton></div>
                <div><bitton onClick={handleQuit}>QUIT</bitton></div>
            </div>
        </div>
    )
}
