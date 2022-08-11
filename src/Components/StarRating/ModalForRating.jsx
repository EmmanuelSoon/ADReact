import React , { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating'
import Modal from 'react-bootstrap/Modal';

export default function ModalForRating(props) {
    const {show, setShow, userId, recipeId} = props
    let navigate = useNavigate();
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
        //console.log(formData)
        await fetch('/comment/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        setShow(false)
        //navigate("/recipes/" + recipeId)
        window.location.reload();
    }
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Add Review to for recipe!</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className='row'>
                            <div className='col-9'>
                                Tell us your rating!
                            </div>
                            <div className='col-3'>
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
                            <div className='col-12'>
                                <textarea rows="3" placeholder="Input your comment here.(Max. 500 characters)" value={comment}
                                        onChange={(e) => handleCommentChange(e)} style={{width:'100%'}}>
                            </textarea>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
                <button className='btn btn-danger' onClick={() => setShow(false)}>Cancel</button>
            </Modal.Footer>
        </Modal>
    )
}
