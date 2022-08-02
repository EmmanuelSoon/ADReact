import React from 'react';
import {Routes , Route} from 'react-router-dom';

import Home from './HomeComponent'
import Recipe from './RecipeComponent'

function Main () {
    return (
        <div>
            <Routes>
                <Route path="/home" element={<Home />}/>
                <Route path="/home/:id" element={<Recipe />}/>
            </Routes>
        </div>
    )
}

export default Main;