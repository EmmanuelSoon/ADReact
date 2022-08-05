import React, { useEffect } from 'react';
import {Routes , Route, Navigate, useSearchParams } from 'react-router-dom';

import Home from './HomeComponent'
import Recipe from './RecipeComponent'
import Header from './HeaderComponent'
import NewRecipe from './NewRecipeForm/NewRecipe';
import Login from './Login/Login';
import LoginWithData from './Login/LoginWithData';
function Main () {

    const [searchParams, setSearchParams] = useSearchParams();
    // useEffect(()=>{
    //     console.log(searchParams.get("userId"))
    // },[searchParams])
    // const {userId} = searchParams.get("userId")
    return (
        <div>
            <Header/>
            <Routes>
                {/* <Route path="/" element={<Home userId={searchParams.get("userId")}/>}/>
                <Route path="/recipes/:id" element={<Recipe />} /> */}
                <Route path='/recipe/new' element={<NewRecipe />} />
                <Route path='/login' element={<Login />} />
                {/* <Route path='/login/:username/:password' element={<LoginWithData />} />
                <Route path="*" element= {<Navigate to="/" replace />} />  */}
            </Routes>
        </div>
    )
}
export default Main;