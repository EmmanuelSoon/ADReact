import React, { useEffect } from 'react';
import {Routes , Route, Navigate, useSearchParams } from 'react-router-dom';

import Home from './HomeComponent';
import Recipe from './RecipeComponent';
import NewRecipe from './NewRecipeForm/NewRecipe';
import Login from './Login/Login';
import LoginWithData from './Login/LoginWithData';
import EditRecipe from './NewRecipeForm/EditRecipe';
import Logout from './Logout/Logout'
import WithoutNav from './withoutNav';
import WithNav from './withNav';

function Main () {

    const [searchParams, setSearchParams] = useSearchParams();


    

    return (
        <div>
            <Routes>
                <Route element={<WithNav />}>
                    <Route path="/" element={<Home userId={searchParams.get("userId")}/>}/>
                    <Route path="/recipes/:id" element={<Recipe userId={searchParams.get("userId")}/>} /> 
                    <Route path="/recipe/edit/:id" element={<EditRecipe userId={searchParams.get("userId")}/>} />
                    <Route path='/recipe/new' element={<NewRecipe />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="*" element= {<Navigate to="/" replace />} /> 
                </Route>
                <Route element={<WithoutNav />}>
                    <Route path='/login' element={<Login />} />
                    <Route path="/android/:id/:userhash/:passhash" element={<LoginWithData />} />
                </Route>
            </Routes>
        </div>
    )
}
export default Main;