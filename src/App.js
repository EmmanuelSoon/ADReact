import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter, useParams, Routes, Route } from 'react-router-dom';
import Main from './Components/MainComponent'
import Login from './Components/Login/Login';
import useToken from './useToken';

function App() {

  const { token, setToken } = useToken();
  const {id, userhash, passhash} = useParams()

  console.log(id)

  // if(!token){
  //   return <Login setToken={setToken}/>
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
