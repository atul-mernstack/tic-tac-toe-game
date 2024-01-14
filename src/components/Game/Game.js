import React, { useState } from 'react';
import {Board} from '../Board/Board';
import './Game.css';
import { Popup } from '../popup/Popup';
export const Game=()=>{
const [isPopupOpen, setIsPopupOpen] = useState(false);
const [show,setShow]=useState(false);
const [reset,setReset]=useState(false);
const handleRefresh = () => {  
  setIsPopupOpen(true);
  setReset(false)
}

const closePopup = () => {
  setIsPopupOpen(false);
  setReset(true)
};
    return(
        <div className="game">
         {isPopupOpen && <Popup onClose={closePopup} setShow={setShow} />}
        <div className="game-board" style={{}}>
          <Board handleRefresh={handleRefresh} show={show} setShow={setShow} reset={reset}/>
        </div>
      </div>
    )
}