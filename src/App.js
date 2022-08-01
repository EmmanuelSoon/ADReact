import React, {useState} from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Main from './Components/MainComponent'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
