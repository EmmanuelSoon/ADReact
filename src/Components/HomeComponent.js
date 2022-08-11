import React, {useEffect, useState} from 'react';
import { Card, Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RecipeSearch from './RecipeSearchComponent';
function Home (props) {

    const [recipes, setRecipes] = useState([]);
    const [searchContent, setSearchContent] = useState('')
    //define whether it is first time loading the page
    const [flag, setFlag] = useState(true)
    // works like componentDidMount
    useEffect(() => {
        // fetch data from db
        if (flag){
            fetch('/recipe/all')
            .then(response => response.json())
            .then( data => {
                // console.log(data)
                setRecipes(data)
            })
            setFlag(false)
        } 
    }, [])
    const handleSearch = () => {
        const keyword = searchContent.trim()
        console.log(keyword)
        if (keyword.length > 0) {
            fetch(`/recipe/search/${keyword}`)
            .then(response => response.json())
            .then( data => {
                setRecipes(data)
            })
        }
        else {
            fetch('/recipe/all')
            .then(response => response.json())
            .then( data => {
                setRecipes(data)
            })
        }
    }

    const recipelist = recipes.map(recipe => {
        return (
            <div>
                <Card key={recipe.id}>
                {/* process.env.PUBLIC_URL + "/asset/images/" +  */}
                    <Card.Img variant="top" src= {recipe.image}  height="300px" style={{objectFit: "cover"}}/>
                    <Card.Body>
                        <Card.Title className='lead'><strong>{recipe.name}</strong></Card.Title>
                        <Card.Text className='lead'>
                            Created By: {recipe.user.name}<span className='float-end text-muted'>{recipe.dateTime.slice(0,10)}</span><br/>
                            Number of Steps: {recipe.procedures.length} <br/> 
                            {parseFloat(recipe.calPerServing).toFixed(0)} calories Per Serving! 
                        </Card.Text>
                        <Link to ={"/recipes/" + recipe.id} state={{userId: props.userId}}>
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
            <RecipeSearch setSearchContent={setSearchContent} searchContent={searchContent} handleSearch={handleSearch}/>
            <Row sm={1} md={3} className="g-3">
                {recipes.length !== 0 ? recipelist : <div>There is no result found!</div>}
            </Row>
        </div>
    );
}
export default Home;