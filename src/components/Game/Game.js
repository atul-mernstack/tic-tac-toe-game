import React, { useState } from 'react';
import {Board} from '../Board/Board';
import './Game.css';
import { Popup } from '../popup/Popup';
export const Game=()=>{
const [isPopupOpen, setIsPopupOpen] = useState(false);
const [show,setShow]=useState(false);
const handleRefresh = () => {
  //setOpa(true);
  setIsPopupOpen(true);
}

const closePopup = () => {
  setIsPopupOpen(false);
};
    return(
        <div className="game">
         {isPopupOpen && <Popup onClose={closePopup} setShow={setShow} />}
        <div className="game-board" style={{}}>
          <Board handleRefresh={handleRefresh} show={show} setShow={setShow}/>
        </div>
      </div>
    )
}