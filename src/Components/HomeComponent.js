import React, {useEffect, useState} from 'react';
import { Card, Button } from 'react-bootstrap';

function Home () {

    const [recipes, setRecipes] = useState([]);


    // works like componentDidMount
    useEffect(() => {
        console.log('test')
        // fetch data from db
    }, [])


    const recipelist = recipes.map(recipe => {
        return (
            <Card key={recipe.id}>
                <Card.Img variant="top" src= "#" />
                <Card.Body>
                    <Card.Title>{recipe.dish.name}</Card.Title>
                    <Card.Text>Calories: {recipe.getTotalCalories}</Card.Text>
                    <Button variant="primary">Details</Button>
                </Card.Body>
            </Card>
        )
    })

    return (
        <div>
            <h1>Recipes</h1>
             {recipelist}
        </div>
    );
}

export default Home;