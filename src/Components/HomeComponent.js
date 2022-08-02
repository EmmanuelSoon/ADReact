import React, {useEffect, useState} from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home () {

    const [recipes, setRecipes] = useState([]);


    // works like componentDidMount
    useEffect(() => {
        console.log('test')
        // fetch data from db
        fetch('/recipe/all')
        .then(response => response.json())
        .then( data => {
            // console.log(data)
            setRecipes(data)
        })
    }, [])


    const recipelist = recipes.map(recipe => {
        return (
            <Card key={recipe.id}>
                <Card.Img variant="top" src= {recipe.image} />
                <Card.Body>
                    <Card.Title>{recipe.dish.name}</Card.Title>
                    <Card.Text>Calories: {recipe.getTotalCalories}</Card.Text>
                    <Button variant="primary" tag ={Link} to ={"/recipes/" + recipe.id}>Click for more details</Button>
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