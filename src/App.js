import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './Components/MainComponent'
import NewRecipe from './Components/NewRecipeForm/NewRecipe'
import Login from './Components/Login/Login';
function App() {

    // const userId = localStorage.getItem("userId")
    // if(!userId){
    //   return(<Login />)
    // }
    return (
      <BrowserRouter>
        <div>
          <Main /> 
        </div>
      </BrowserRouter>
    );
}

export default App;
