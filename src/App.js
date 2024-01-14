import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.js';
import { Game } from './components/Game/Game.js';
import { Quote } from './components/Quote/Quote.js';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App ">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path="/game/:turn" element={<Game />} />
          <Route path='/game' element={<Game />} />
        </Routes>
      </div>
      {/* <div className='quote-display'>
      <Quote/>
      </div> */}
     
    </BrowserRouter>

  );
}

export default App;
