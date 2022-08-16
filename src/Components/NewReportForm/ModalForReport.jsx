import React , { useState } from 'react'
import Modal from 'react-bootstrap/Modal';

export default function ModalForReport(props) {
    const {show, setShow, userId, recipeId, recipeName} = props
    const [category, setCategory] = useState(-1)
    const [content, setContent] = useState('')
    //const [errorMsg, setErrorMsg] = useState('')
    const [disabled, setDisabled] = useState(true)
    const handleCommentChange = (e) => {
        const text = e.target.value;
        if (text.length > 500) {
            alert("Maximum length is 500 characters")
            return;
        }
        setContent(text)
    }
    const handleChange = (e) => {
        const selected = parseInt(e.target.value)
        console.log(selected)
        setCategory(selected)
        setDisabled(selected < 0)
    }
    const handleSubmit = async () => {
        const formData = {
            userId:userId,
            content:content,
            recipeId:recipeId,
            categoryId:category
        }
        console.log(formData)
        await fetch('/report/create', {
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
        alert("Your report is submitted successfuly and we will reach you soon!")
    }
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Report Recipe</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row'>
                            <label className='mb-2'><strong>Select Report Category</strong></label>
                            <div className='col-12'>
                                <select className="form-select" onChange={handleChange} value={category}>
                                    <option value={-1}>select report category</option>
                                    <option value={0}>Wrong Nutritional Information</option>
                                    <option value={1}>Irrelevant Content</option>
                                    <option value={2}>Unauthorized Recipe</option>
                                    <option value={3}>Other</option>
                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            <label className='my-2'><strong>Report Category</strong></label>
                            <div className='col-12'>
                                <textarea rows="3" placeholder="Input your report detail here.(Max. 500 characters)" value={content}
                                        onChange={(e) => handleCommentChange(e)} style={{width:'100%'}}>
                                </textarea>
                            </div>
                        </div>
                        {/* <div className='row'>
                            <div className='col-12'>
                                <p className="text-danger"> {errorMsg} </p>
                            </div>
                        </div> */}
                    </div>
                </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-primary' disabled={disabled} onClick={handleSubmit}>Submit</button>
                <button className='btn btn-danger' onClick={() => setShow(false)}>Cancel</button>
            </Modal.Footer>
        </Modal>
    )
}
