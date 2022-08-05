import React, { useEffect } from 'react';
import {Routes , Route, Navigate, useSearchParams } from 'react-router-dom';

import Home from './HomeComponent'
import Recipe from './RecipeComponent'
import Header from './HeaderComponent'
import Logout from './Logout/Logout';
import NewRecipe from './NewRecipeForm/NewRecipe';
import Login from './Login/Login';
import LoginWithData from './Login/LoginWithData';
import EditRecipe from './NewRecipeForm/EditRecipe'

function Main () {

    const [searchParams, setSearchParams] = useSearchParams();
    // const {userId} = searchParams.get("userId")
    // const userId = 
    // const [userId, setUserId] = useSearchParams(localStorage.getItem("userId"));
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Home userId={searchParams.get("userId")}/>}/>
                <Route path="/recipes/:id" element={<Recipe userId={searchParams.get("userId")}/>} /> 
                <Route path="/recipe/edit/:id" element={<EditRecipe userId={searchParams.get("userId")}/>} />
                <Route path='/recipe/new' element={<NewRecipe />} />
                <Route path='/login' element={<Login />} />
                <Route path='/logout' element={<Logout />} />
                <Route path="*" element= {<Navigate to="/" replace />} /> 
            </Routes>
        </div>
    )
}
export default Main;