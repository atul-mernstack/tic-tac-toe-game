import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quote } from '../Quote/Quote';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

export default function Home() {
    const [turn, setTurn] = useState();
    const navigate = useNavigate();
    const handleNewGameVsCpu = () => {
        if (turn === 'X' || turn === 'O')
            navigate(`/game/${turn}`);
        else
            toast("First pick the player", 'error');
    }

    const handleX = (e) => {
        setTurn(e.target.innerText);
    }

    const handleO = (e) => {
        setTurn(e.target.innerText);
    }
    const handleInvite = () => {
        toast("Wow so easy!");
    }

    
    return (
        <>
            <div className='container'>
                <div><span className='xo'>X</span><span className='ox'>O</span></div>
                <div className='player'>
                    <div><h2>PICK PLAYER</h2></div>                    
                    <div class="pick-player">
                        <button onClick={handleX} className='x'>X</button>
                        <button onClick={handleO} className='o'>O</button>
                    </div>
                </div>
                <div>
                    <button onClick={handleNewGameVsCpu} className='newgamevscpu'>NEW GAME(VS CPU)</button>
                </div>
                <div>
                    <button className='newgamevshuman'>NEW GAME (VS HUMAN) Comming soon</button>
                </div>
                <div>
                    <button onClick={handleInvite} className='invitation'>invite your friend</button>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}
