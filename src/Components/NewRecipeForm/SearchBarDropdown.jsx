import React, {useState, useRef, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './searchbar.css'
export default function SearchBarDropdown(props) {
    const [select, setSelect] = React.useState(null);
    const [foods, setFoods] = React.useState([]);
    const [disable, setDisable] = React.useState(true);
    const {addIngredient} = props
    const ulRef = useRef()
    const inputRef = useRef()
    const onInputChange = (event) => {
        const content = event.target.value
        if (content !== null && content.length > 0) {
            //baseFoods.filter(food => food.includes(event.target.value))
            fetch(`/recipe/ingredients/` + content)
            .then(response => response.json())
            .then(data => {
                setFoods(data)
            }, [])
        }
        else {
            fetch(`/recipe/ingredients`)
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                setFoods(data)
            }, [])
        }
    }
    const onAdd = () => {
        const num = select
        //console.log(select)
        addIngredient(num);
        document.getElementById("search-bar").value = ''
        setDisable(true)
        setSelect(-1)
        const num2 = select
        //console.log(num2)
    }
    const handleOnSelect = (food) => {
        inputRef.current.value = food.name
        setDisable(false)
        setSelect(food.id)
        const num = select
        //console.log(num)
    }
    useEffect(() => {
        inputRef.current.addEventListener('click', (event) => {
            event.stopPropagation()
            setDisable(true)
            ulRef.current.style.display='flex'
            onInputChange(event)
        })
        document.addEventListener('click', (event) => {
            ulRef.current.style.display='none'
        })
    },[])
    const foodlist = foods.map((food, index) => {
        return (
            <button type="button" className='list-group-item list-group-item-action' 
                key={food.id} onClick={() => {handleOnSelect(food)}}>
                    {food.name}
            </button>
        )
    })
    return (
        <div className='row'>
            <div className="search-bar-dropdown col-10">
                <input id="search-bar" type="text" className="form-control" 
                    placeholder="Search Ingredient..." onChange={onInputChange} ref={inputRef}/>
                <ul id="results" className='list-group' ref={ulRef}>
                    {foodlist}
                </ul>
            </div>
            
            <button className='col-2 btn btn-primary' onClick={onAdd} disabled={disable}>Add</button>
        </div>
    )
}
