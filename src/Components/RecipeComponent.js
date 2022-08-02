import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import {Image} from 'react-bootstrap';

function Recipe(){

    const emptyRecipe = {
        id: 0,
        image: '',
        user: [],
        dish: [],
        dateTime: '',
        ingredientList: [],
        procedures: []
    };

    const [recipe, setRecipe] = useState(emptyRecipe);

    return (
        <div className='container'>

        <div className="row mt-5 mb-5" >
            <div className="col-12 col-md-8">
                <div className="my-5">
                    <span>April 05, 2018</span>
                    <h2>Vegetarian cheese salad</h2>
                    <div >
                        <h6>Prep: 15 mins</h6>
                        <h6>Cook: 30 mins</h6>
                        <h6>Yields: 8 Servings</h6>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-4">
                        <div class="text-right my-5">
                            <div class="ratings">
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                            <button className='btn btn-primary'>Add rating</button>
                        </div>
                    </div>
        </div>
        <div className="row d-flex justify-content-center" >
            <div className='col-auto'>
                <Image alt='placeholder' src= {process.env.PUBLIC_URL + '/asset/images/placeholder.jpg'} width="600" height='500'></Image>
            </div>
        </div>
        <div className='row d-flex justify-content-around mt-5'>
            <div className='col-4 offset-1 align-middle'>
                <div>
                    <h3>Ingredients</h3>
                </div>
                <ol>
                    <li>ingredient 1</li>
                    <li>ingredient 1</li>
                    <li>ingredient 1</li>
                    <li>ingredient 1</li>
                </ol>
            </div>
            <div className='col-4 align-middle'>
                <div>
                    <h3>Nutritional Value</h3>
                    <ol>
                        <li>ingredient 1: 100 cal</li>
                        <li>ingredient 1: 100 cal</li>
                        <li>ingredient 1: 100 cal</li>
                        <li>ingredient 1: 100 cal</li>
                    </ol>
                </div>
            </div>
            <div className='row d-flex justify-content-center mt-5 pb-5 px-5'>
                <div className='col-9 border p-3'>
                    <h2 className= "mb-5">Procedure</h2>
                    <div>
                        step 1: asdasdasdasdadada. <br/>
                        step 2: asasdasdadasdadad. <br/>
                        step 3: adsdadadadadadadad. <br/>
                    </div>
                </div>

            </div>
        </div>
      </div>


    )
}

export default Recipe; 