import axios from "axios";
import React,{useEffect, useState} from "react";
import './Quote.css';

export const Quote=()=>{
    const [quote,setQuote]=useState('It is better to fail in originality than to succeed in imitation');

    useEffect(()=>{
        const initial=async()=>{
            try{
                const res=await axios.get('https://api.adviceslip.com/advice');
                if(res?.data){
                    setQuote(res.data.slip.advice);
                }
            }catch(err){
                console.log(err);
            }
        }
        setInterval(()=>{           
            initial();
        },60*1000)
        
    },[])

    return(
        <div className='quote'>
            <div><h3>Quote #1</h3></div>
            <div><p>{quote}</p></div>  
            <div className="circle"></div>      
        </div>
    )
}