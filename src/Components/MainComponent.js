import React from 'react';
import {Routes , Route, Navigate } from 'react-router-dom';
import Home from './HomeComponent'
import Recipe from './RecipeComponent'
import Header from './HeaderComponent'

function Main () {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/recipes" element={<Home />}/>
                <Route path="/recipes/:id" element={<Recipe />}/>

                 <Route path="*" element= {<Navigate to="/recipes" replace />} /> 
             </Routes>
        </div>
    )
}

export default Main;