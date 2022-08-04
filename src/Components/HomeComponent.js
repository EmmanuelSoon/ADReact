import React, {useEffect, useState} from 'react';
import { Card, Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home (props) {

    const [recipes, setRecipes] = useState([]);


    // works like componentDidMount
    useEffect(() => {
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
            <div>
                <Card key={recipe.id}>
                    <Card.Img variant="top" src= {process.env.PUBLIC_URL + "/asset/images/" + recipe.image}  height="300px" style={{objectFit: "cover"}}/>
                    <Card.Body>
                        <Card.Title className='lead'><strong>{recipe.dish.name}</strong></Card.Title>
                        <Card.Text className='lead'>
                            Created By: {recipe.user.name}<span className='float-end text-muted'>{recipe.dateTime.slice(0,10)}</span><br/>
                            Number of Steps: {recipe.procedures.length} <br/> 
                            {parseFloat(recipe.dish.calorie).toFixed(0)} calories! 
                        </Card.Text>
                        <Link to ={"/recipes/" + recipe.id} state={{recipe}}>
                            <Button>Click for more details</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </div>
        )
    })

    return (
        <div className='col-10 offset-1'>
            <h1 className='display-3 mt-3 mb-3'>Recipes</h1>
            <Row sm={1} md={3} className="g-3">
                {recipelist}
            </Row>
        </div>
    );
}

export default Home;