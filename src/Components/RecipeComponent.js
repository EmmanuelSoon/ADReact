import React, {useState} from 'react'
import { withRouter } from 'react-router-dom';

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
        <div>
            <h1>{recipe.dish.name}</h1>
            {/* add the details, steps and nutritional values */}
        </div>
    )
}

export default withRouter(Recipe); 