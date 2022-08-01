import React from 'react';
import {Routes , Route} from 'react-router-dom';

import Home from './HomeComponent'

function Main () {
    return (
        <div>
            <Routes>
                <Route path="/home" element={<Home />}/>
            </Routes>
        </div>
    )
}

export default Main;