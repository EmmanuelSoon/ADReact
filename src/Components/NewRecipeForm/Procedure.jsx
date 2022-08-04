import React, {useState} from 'react'

export default function Procedure(props) {
    const{addProcedure} = props
    const [message, setMessage] = useState('');
    const [disable, setDisable] = React.useState(true);
    const handleMessageChange = (event) => {
        const text =event.target.value
        setMessage(text);
        if (text.length > 0){
            setDisable(false)
        }
        else {
            setDisable(true)
        }
    }
    const handleSubmit =() =>{
        const text = document.getElementById("input-procedure").value
        addProcedure(text)
        setMessage('')
        setDisable(true)
    }
    return (
        <div>
            <div className='row'>
                <textarea rows="3" cols="50" placeholder="Add recipe steps here"
                    id="input-procedure" value={message}
                    onChange={handleMessageChange}>
                </textarea>
            </div>     
            <div className='row col-2 ms-auto mt-2 mb-2'>
                <button className='btn btn-primary' disabled={disable} 
                    onClick={handleSubmit}>Add</button>
            </div>
        </div>
    )
}
