import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

 function Recipe(){

    let {id} = useParams();
    const emptyRecipe = {
        id: 0,
        image: '',
        user: [],
        dish: [],
        dateTime: '',
        ingredientList: [],
        procedures: [],
        nutritionRecord: []
    };

    const [recipe, setRecipe] = useState(emptyRecipe);

    useEffect(() => {
        fetch(`/recipe/${id}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            setRecipe(data)
        })
    }, [])


    const nutritionalList = Object.keys(recipe.nutritionRecord).map(function(key,index) {
        if(key === 'id') return
        else if (key === 'servingSize') return 
        else if (key === 'totalCalories') return
        else {
            return (
                <li>{key.toUpperCase()} : {parseFloat(recipe.nutritionRecord[key]).toFixed(2)}</li>
            )
        }
    })

    const ingredients = recipe.ingredientList.map(weighted => {
        return <li key={weighted.id}>{weighted.ingredient.name}: {weighted.weight}g</li>
    })

    const steps = recipe.procedures.map((currStep, index) => {
        return(
            <div className='mb-2'>
                <span key={currStep.id}>
                    <strong>Step {index + 1}:</strong> <br/> {currStep.detail}
                </span> 
            </div>
        )
    })

    return (
        <div className='container'>

        <div className="row mt-5 mb-5" >
            <div className="col-12 col-md-8">
                <div className="my-5">
                    <span>{recipe.dateTime.slice(0,10)}</span>
                    <h2>{recipe.dish.name}</h2>
                    <div >
                        <h6>Total Calories: {parseFloat(recipe.totalCalories).toFixed(2)}</h6>
                        <h6>One Portion: {recipe.nutritionRecord.servingSize} grams </h6>
                    </div>
                </div>
            </div>

            <div className="col-12 col-md-4">
                        <div className="text-right my-5">
                            <div className="ratings">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                            <button className='btn btn-primary'>Add rating</button>
                        </div>
                    </div>
        </div>
        <div className="row d-flex justify-content-center" >
            <div className='col-auto'>
                <Image alt='placeholder' src= {process.env.PUBLIC_URL + '/asset/images/' + recipe.image} className="img-fluid border border-dark"></Image>
            </div>
        </div>
        <div className='row d-flex justify-content-around mt-5'>
            <div className='col-12 col-md-4 offset-md-1 align-middle'>
                <div>
                    <h3>Ingredients</h3>
                </div>
                <ol>
                    {ingredients}
                </ol>
            </div>
            <div className='col-12 col-md-4 align-middle'>
                <div>
                    <h3>Nutritional Value</h3>
                    <ol>
                        {nutritionalList}
                    </ol>
                </div>
            </div>
            <div className='row d-flex justify-content-center mt-5 pb-5 px-5'>
                <div className='col-12 col-md-9 border p-3'>
                    <h2 className= "mb-3">Procedure</h2>
                    <div>
                        {steps}
                    </div>
                </div>

            </div>
        </div>
      </div>


    )
}

export default Recipe; 
