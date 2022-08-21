import React, { useState ,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBarDropdown from './SearchBarDropdown';
import ModalForNutrition from './ModalForNutririon';
import Procedure from './Procedure';
import { useParams, useLocation, useNavigate } from 'react-router-dom';


export default function EditRecipe(props) {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId")

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
    const [name, setName] = useState('')
    const[portion, setPortion] = useState(1)
    const[imageDataURL, setImageDataURL] = useState(null)
    const[show, setShow] = useState(false)
    const [weightIngredients, setWeightIngredient] = useState([])
    const [nutritions, setNutritions] = useState({
        calories:0,
        proteins:0,
        carbohydrates:0,
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
    const[procedures, setProcedures] = useState([])


    useEffect(() => {
        fetch(`/recipe/${id}`)
        .then(response => response.json())
        .then(async data => {
            console.log(data)
            if(parseInt(userId) !== data.user.id){
                navigate("/", {replace:true})
            }
            await setProcedures([])
            setRecipe(data)
        })
    }, [])



    useEffect(() =>{
        updateNutritionData()
    },[weightIngredients])
    

    const addProcedure = (detail) => {
        if (detail.length > 0) {
            setProcedures([...procedures, detail])
        }
    }
    const deleteProcedure = (index) => {
        setProcedures(
            procedures.filter((p, currentIndex) => currentIndex !== index)
        )
    }

    useEffect(()=>{
        setName(recipe.name)
        setPortion(recipe.portion)
        setImageDataURL(recipe.image)
        setWeightIngredient(recipe.ingredientList)
        recipe.procedures.forEach((step) => {
            let proc = procedures
            proc.push(step.detail)
            setProcedures(proc)
        })
    }, [recipe])


    const handleChange = (value, id) => {
        if (value >= 0) {
            let items = [...weightIngredients]
            let index = items.findIndex(weightIngredient => weightIngredient.ingredient.id === id)
            items[index].weight = value
            setWeightIngredient(
                items
            )
        }
        else {
            deleteAddIngredient(id)
        }
        //updateNutritionData()
    }

    const addIngredient = (id) => {
        if(weightIngredients.findIndex(item => item.ingredient.id == id) >= 0){
        }
        else{
            //console.log("add")
            fetch(`/recipe/ingredient/` + id)
            .then(response => response.json())
            .then(data => {
                if(data != null) {
                    setWeightIngredient(
                        [...weightIngredients,{ingredient:data, weight:1}]
                    )
                }
                else {
                    alert("Invalid Ingredient")
                }
            }, [])
        }
        
    }
    const deleteAddIngredient = (id) => {
        setWeightIngredient(
            weightIngredients.filter(weightIngredient => weightIngredient.ingredient.id !== id)
        )
        //updateNutritionData()
    }

    const updateNutritionData = () => {
        let data = {
            calories:0,
            proteins:0,
            carbohydrates:0,
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
        }
        weightIngredients.forEach(weightIngredient =>{
            const weight = parseFloat(weightIngredient.weight)
            const {totalCalories, proteins, carbs, fats, cholesterol, fiber, sugar, calcium, iron, 
                    sodium, vitaminA, vitaminB12, vitaminB6, vitaminC, vitaminE, vitaminK} = weightIngredient.ingredient.nutritionRecord
            data.calories = data.calories + weight * parseFloat(totalCalories)/100.0
            data.proteins = data.proteins + weight * proteins/100.0
            data.carbohydrates = data.carbohydrates + weight * carbs/100.0
            data.fats = data.fats + weight * fats/100.0
            data.cholesterol = cholesterol > 0 ? data.cholesterol + weight * cholesterol/100.0 :data.cholesterol
            data.fiber = fiber > 0 ? data.fiber + weight * fiber/100.0 :data.fiber
            data.sugar = sugar > 0 ? data.sugar + weight * sugar/100.0 :data.sugar
            data.calcium = calcium > 0 ? data.calcium + weight * calcium/100.0 :data.calcium
            data.iron = iron > 0 ? data.iron + weight * iron/100.0 :data.iron
            data.sodium = sodium > 0 ? data.sodium + weight * sodium/100.0 :data.sodium
            data.vitaminA = vitaminA > 0 ? data.vitaminA + weight * vitaminA/100.0 :data.vitaminA
            data.vitaminB12 = vitaminB12 > 0 ? data.vitaminB12 + weight * vitaminB12/100.0 :data.vitaminB12
            data.vitaminB6 = vitaminB6 > 0 ? data.vitaminB6 + weight * vitaminB6/100.0 :data.vitaminB6
            data.vitaminC = vitaminC > 0 ? data.vitaminC + weight * vitaminC/100.0 :data.vitaminC
            data.vitaminE = vitaminE > 0 ? data.vitaminE + weight * vitaminE/100.0 :data.vitaminE
            data.vitaminK = vitaminK > 0 ? data.vitaminK + weight * vitaminK/100.0 :data.vitaminK
            data.servingSize = data.servingSize + weight
        })
        setNutritions(data)
    }

    const weightIngredientsList = weightIngredients.map((weightIngredient, index) => {
        return(
                <tr key={weightIngredient.ingredient.id}>
                    <td>
                        {weightIngredient.ingredient.name}
                    </td>
                    <td>
                        <input type="number" className='w-50' value={weightIngredient.weight} onChange={(event) => handleChange(event.target.value,weightIngredient.ingredient.id)}/>
                    </td>
                    <td>
                        <input type="button" value="delete" className='btn btn-danger' onClick={() => deleteAddIngredient(weightIngredient.ingredient.id)}/>
                    </td>
                </tr>
        )
    })

    const fullNutritionInfo = () => {
        return (
            <div>
                <table className='table'>
                    <thead><tr><th>Nutritional Info</th><th>Value</th></tr></thead>
                    <tbody>
                        <tr><td>Calories</td><td>{nutritions.calories.toFixed(2)} kcal</td></tr>
                        <tr><td>Protein</td><td>{nutritions.proteins.toFixed(2)} g</td></tr>
                        <tr><td>Carbohydrates</td><td>{nutritions.carbohydrates.toFixed(2)} g</td></tr>
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

    const mainNutritionInfo = () => {
        return(
            <div>
                <div className='col-12'>
                    <p className='mt-2'><strong><u>Serving Weight: {nutritions.servingSize} g</u></strong></p>
                </div>
                <div className='col-12'>
                    <table className='table'>
                        <thead><tr><th>Nutritional Info</th><th>Value</th></tr></thead>
                        <tbody>
                            <tr><td>Calories</td><td>{nutritions.calories.toFixed(2)} kcal</td></tr>
                            <tr><td>Protein</td><td>{nutritions.proteins.toFixed(2)} g</td></tr>
                            <tr><td>Carbohydrates</td><td>{nutritions.carbohydrates.toFixed(2)} g</td></tr>
                            <tr><td>Fat</td><td>{nutritions.fats.toFixed(2)} g</td></tr>
                            <tr><td>Cholesterol</td><td>{nutritions.cholesterol.toFixed(2)} mg</td></tr>
                            <tr><td>Fiber</td><td>{nutritions.fiber.toFixed(2)} g</td></tr>
                            <tr><td>Sugar</td><td>{nutritions.sugar.toFixed(2)} g</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className='col-12 col-md-6 ms-auto'>
                    <button className='btn btn-primary float-end' onClick={() => {setShow(true)}}>Full Nutritional Information</button>
                </div>    
            </div>
        )
    }

    const storedProcedures = procedures.map((procedure, index) =>{
        return(
            <div className='row mt-2 mb-2' key={index}>
                <div className='col-9'>
                    <strong>Step {index+1}: </strong> 
                    <p className='word'>{procedure}</p>
                </div>
                <div className='col-3'>
                    <button className='btn btn-danger float-end' onClick={() => deleteProcedure(index)}>remove</button>
                </div>
            </div>

        )
    })

    const imageHandler = e  => {
        //console.log(e.target.value)
        if (e.target.value.length === 0){
            return
        }
        // const reader = new FileReader()
        // console.log(event.target.files[0])
        // reader.readAsDataURL(event.target.files[0])
        // reader.addEventListener("load", () =>{
        //     console.log(reader.result)
        //     document.getElementById("upload-image").src = reader.result
        //     document.getElementById("upload-image").display = true
        // })
        var canvas = document.getElementById('imageCanvas');
        var ctx = canvas.getContext('2d');
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        //console.log(e.target.files)
        reader.onload = (e) => {
            var img = new Image();
            img.src = e.target.result;
            img.onload = function(){
                canvas.width = 200;
                canvas.height = 200;
                ctx.drawImage(img,0,0,200,200);
                console.log()
                setImageDataURL(
                    canvas.toDataURL("image/jpeg")
                )
                console.log(imageDataURL)
            } 
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            name:name,
            weightedIngredients:weightIngredients,
            procedures:procedures,
            portion:portion,
            image:imageDataURL,
            userId:userId
        }
        fetch(`/recipe/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        // })
        }).then(navigate("/", {replace:true}));
        // navigate("/", {replace:true})
    }

    return (
        <div className='container mt-2 mb-2'>
        <ModalForNutrition show = {show} setShow={setShow} fullNutritionInfo = {fullNutritionInfo()}/>
        {/* <form method='post' onSubmit={handleSubmit}> */}
            <h2>Edit Your Recipe!</h2>
            <div className='row mt-2 mb-2'>
                <div className='col-12'>
                    <input className='form-control mt-2 mb-2' placeholder="Recipe Name"
                        type="text" onChange={(event) => {setName(event.target.value)}} value={name}/>
                </div>
            </div>
            <h3>Add Ingredients</h3>
            <div className='row mt-2 mb-2'>
                <SearchBarDropdown addIngredient={addIngredient}/>
            </div>
            <div className='row'>
                <div className='col-12 col-md-7'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Ingredient Name</th>
                                <th>Ingredient Weight</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weightIngredientsList}
                        </tbody>
                    </table>
                </div>
                <div className='col-12 col-md-5'>
                    {mainNutritionInfo()}
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <h2>Recipe Procedures</h2>
                </div>
            </div>
        <div className='row'>
            <div className='col-12'>
                <h2>Recipe Procedures</h2>
            </div>
        </div>
            {storedProcedures}
        <div className='row'>
            <div className='col-12'>
                <Procedure addProcedure={addProcedure} deleteProcedure={deleteProcedure}/>
            </div>
        </div>
            <div className='row mt-4 mb-4'>
                <div className='col-12 col-sm-3'>
                    <h4>Select Number of Servings:</h4>
                </div>
                <div className='col-12 col-sm-3'>
                    <input className='form-control border' type="number" min={1} value={portion} onChange={(event) => setPortion(event.target.value)}/>
                </div>
            </div>  
            {/* <div className='row mt-2 mb-2'>
                <div className='col-12 col-sm-3'>
                    <h4>Upload Photo:</h4>
                </div>
                <div className='col-12 col-sm-3'>
                    <input type="file" onChange={imageHandler} accept="image/*" title=" "/>
                </div>
            </div> */}
            
            <div className='row'>
                <div className='col-12 ms-auto text-right'>
                    <button className='btn btn-primary float-end' type='submit' onClick={handleSubmit}>Update Recipe</button>
                </div>
            </div>
            <div className='row'>
                <div className='col-11'>
                    <canvas id="imageCanvas"></canvas>
                </div>
            </div>   
       {/* </form> */}
    </div>
  )
}