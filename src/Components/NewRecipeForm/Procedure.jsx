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

                    <textarea rows="3" placeholder="Add recipe steps here"
                        id="input-procedure" value={message}
                        onChange={handleMessageChange}>
                    </textarea>
                

            </div>     
            <div className='col-12 ms-auto mt-2 mb-2'>
                <button className='btn btn-primary float-end' disabled={disable} 
                    onClick={handleSubmit}>Add Step</button>
            </div>
        </div>
    )
}
