import React from 'react'
import {Routes , Route,  } from 'react-router-dom';

import Home from './HomeComponent'

export function Main () {
    return (
        <div>
            <Routes>
                <Route path="/home" component={Home}/>
            </Routes>
        </div>
    )
}