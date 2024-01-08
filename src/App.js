import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home/Index.js';
import {Game} from './components/Game/Game.js';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App ">
      <div className='game-container'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/> 
        <Route path="/game/:turn" element={<Game/>} />
        <Route path='/game' element={<Game/>} />
        
      </Routes>
      </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
