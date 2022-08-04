import React, { useEffect } from 'react';
import {Routes , Route, Navigate, useSearchParams } from 'react-router-dom';

import Home from './HomeComponent'
import Recipe from './RecipeComponent'
import Header from './HeaderComponent'

function Main () {

    const [searchParams, setSearchParams] = useSearchParams();

    // useEffect(()=>{
    //     console.log(searchParams.get("userId"))
    // },[searchParams])

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home userId={searchParams.get("userId")}/>}/>
                <Route path="/recipes/:id" element={<Recipe />} />

                <Route path="*" element= {<Navigate to="/" replace />} /> 
            </Routes>
        </div>
    )
}

export default Main;