import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating'
export default function RatingForm(props) {
    let navigate = useNavigate();
    const userId = parseInt(localStorage.getItem('userId'))
    const {recipeId} = props
    const [ratingValue, setRatingValue] = useState(0)
    const [comment, setComment] = useState('')
    const handleRating = (rate) => {
        setRatingValue(rate)
    }
    const handleReset = () => {
        setRatingValue(0)
    }
    const handleCommentChange = (e) => {
        const text = e.target.value;
        if (text.length > 500) {
            alert("Maximum length is 500 characters")
            return;
        }
        setComment(text)
    }
    const handleSubmit = async() => {
        if (!window.confirm("Confirmed to submit the comment?")) return;
        const formData = {
            userId:userId,
            content:comment,
            recipeId:recipeId,
            rating:ratingValue/20.0
        }
        console.log(formData)
        await fetch('/comment/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        alert("Your comment is submitted successfully!")
        navigate("/recipes" + recipeId)
    }
  return (
    <div>
        <div className='row'>
            <div className='col-10'>
                Tell us your rating!
            </div>
            <div className='col-2'>
                <button onClick={handleReset} className="btn btn-primary">Reset</button>
            </div>
        </div>
        <div className='row'>
            <div className='col-12'>
                <Rating onClick={handleRating} ratingValue ={ratingValue} initialValue={0} 
                    allowHalfIcon={true} size={22} transition={true} showTooltip={true} tooltipDefaultText={0}
                    tooltipClassName={'bg-white text-dark'}/>
            </div>
        </div>
        <div className='row mt-1'>
            <div color='col-12'>
                Tell us your comments Below for the recipe!
            </div>
        </div>
        <div className='row mt-1'>
            <div className='col-12'>
                <textarea rows="3" placeholder="Input your comment here.(Max. 500 characters)" value={comment}
                        onChange={(e) => handleCommentChange(e)} style={{width:'100%'}}>
            </textarea>
            </div>
        </div>
        <div className='row'>
            <div className='col-2'>
                <button type='submit' value="submit" className='btn btn-primary' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    </div>

  )
}
