import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './Components/MainComponent'
import NewRecipe from './Components/NewRecipeForm/NewRecipe'

function App() {

  return (
    <BrowserRouter>
      <div>
        <Main /> 
        {/* <NewRecipe /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
