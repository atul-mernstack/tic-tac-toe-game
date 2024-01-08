import React from 'react';
import {Board} from '../Board/Board';
import './Game.css';
export const Game=()=>{

    return(
        <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    )
}