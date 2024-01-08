import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quote } from '../Quote/Quote';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

export default function Home() {
    const [turn,setTurn]=useState();
    const navigate = useNavigate();
    const handleNewGameVsCpu = () => {
        navigate(`/game/${turn}`);
    }

    const handleX=(e)=>{
        setTurn(e.target.innerText);
    }

    const handleO=(e)=>{
        setTurn(e.target.innerText);
    }
    const handleInvite = () => {
        toast("Wow so easy!");
    }

    return (
        <>
            <div className='container'>
                <div><span>X</span><span>O</span></div>
                <h2>PICK PLAYER</h2>
                <div class="pick-player">
                    <button onClick={handleX}>X</button>
                    <button onClick={handleO}>O</button>
                </div>
                <div>
                    <button onClick={handleNewGameVsCpu}>NEW GAME(VS CPU)</button>
                </div>
                <div>
                    <button>NEW GAME (VS HUMAN) Comming soon</button>
                </div>
                <div>
                    <button onClick={handleInvite}>invite your friend</button>
                </div>
                <ToastContainer />
                <Quote/>
            </div>

        </>
    )
}
