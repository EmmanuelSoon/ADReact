import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap';
import { useParams, useLocation, Link } from 'react-router-dom';

 function Recipe(props){

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

    const userId = localStorage.getItem("userId")
    const [recipe, setRecipe] = useState(emptyRecipe);
    const [isUser, setIsUser] = useState(false);
    const [nutritions, setNutritions] = useState({
        id: 0,
        totalCalories:0,
        proteins:0,
        carbs:0,
        fats:0,
        cholesterol:0,
        fiber:0,
        sugar:0,
        calcium:0,
        iron:0,
        sodium:0,
        vitaminA:0,
        vitaminB12:0,
        vitaminB6:0,
        vitaminC:0,
        vitaminE:0,
        vitaminK:0,
        servingSize:0
    })

    useEffect(() => {
        fetch(`/recipe/${id}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            setRecipe(data)
        })
    }, [])


    useEffect(() =>{
        updateNutritionData()
        setIsUser(recipe.user.id == userId)
    },[recipe])

    const updateNutritionData = () => {
        if (recipe.id !== 0){
            setNutritions(recipe.nutritionRecord)
        }
    }

    const showEditButton = () => {
        if(isUser){
            return (
                <Link to ={"/recipe/edit/" + recipe.id} state={{userId: userId}}>
                    <button className='btn btn-success'>Edit Recipe</button>
                </Link>
            )
        }        

        else{
            return <button className='btn btn-primary'>Add rating</button>

        }
    }

    const fullNutritionInfo = () => {
        return (
            <div>
                <table className='table border'>
                    {/* <thead><tr><th>Nutrition Info</th><th>Value</th></tr></thead> */}
                    <tbody>
                    <tr><td>Calories</td><td>{nutritions.totalCalories.toFixed(2)} kcal</td></tr>
                        <tr><td>Protein</td><td>{nutritions.proteins.toFixed(2)} g</td></tr>
                        <tr><td>Carbohydrates</td><td>{nutritions.carbs.toFixed(2)} g</td></tr>
                        <tr><td>Fat</td><td>{nutritions.fats.toFixed(2)} g</td></tr>
                        <tr><td>Cholesterol</td><td>{nutritions.cholesterol.toFixed(2)} mg</td></tr>
                        <tr><td>Fiber</td><td>{nutritions.fiber.toFixed(2)} g</td></tr>
                        <tr><td>Sugar</td><td>{nutritions.sugar.toFixed(2)} g</td></tr>
                        <tr><td>Calcium</td><td>{nutritions.calcium.toFixed(2)} mg</td></tr>
                        <tr><td>Iron</td><td>{nutritions.iron.toFixed(2)} mg</td></tr>
                        <tr><td>Sodium</td><td>{nutritions.sodium.toFixed(2)} mg</td></tr>
                        <tr><td>Vitamin A</td><td>{nutritions.vitaminA.toFixed(2)} IU</td></tr>
                        <tr><td>Vitamin B6</td><td>{nutritions.vitaminB6.toFixed(2)} mg</td></tr>
                        <tr><td>Vitamin B12</td><td>{nutritions.vitaminB12.toFixed(2)} ug</td></tr>
                        <tr><td>Vitamin C</td><td>{nutritions.vitaminC.toFixed(2)} mg</td></tr>
                        <tr><td>Vitamin E</td><td>{nutritions.vitaminE.toFixed(2)} mg</td></tr>
                        <tr><td>Vitamin K</td><td>{nutritions.vitaminK.toFixed(2)} mg</td></tr>
                    </tbody>
                </table>
            </div>
        )
    }


    const ingredients = recipe.ingredientList.map(weighted => {
        return <tr><td key={weighted.id}> {weighted.ingredient.name}: {weighted.weight}g</td></tr>
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
                    <span className='text-muted'>{recipe.dateTime.slice(0,10)}</span>
                    <h2>{recipe.name}</h2>
                    <div >
                        <h6>Total Calories: {parseFloat(recipe.totalCalories).toFixed(0)} Kcal</h6>
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
                            {showEditButton()}
                        </div>
                    </div>
        </div>
        <div className="row d-flex justify-content-center" >
            <div className='col-auto'>
                <Image alt='placeholder' src= {recipe.image} className="img-fluid border border-dark"></Image>
            </div>
        </div>
        <div className='row d-flex justify-content-around mt-5'>
            <div className='col-12 col-md-4 offset-md-1 align-middle'>
                <div>
                    <h3>Ingredients</h3>
                </div>
                <table className='table border'>
                    <tbody>
                        {ingredients}
                    </tbody>
                </table>

            </div>
            <div className='col-12 col-md-4 align-middle'>
                <div>
                    <h3>Nutritional Value</h3>
                    
                    {fullNutritionInfo()}
                    
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
