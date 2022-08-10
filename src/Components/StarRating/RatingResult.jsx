import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

export default function RatingResult(props) {
    const [initialValue, setInitialValue] = useState(props.initialValue)
  return (
    <div className='row'>
        <div className='col-12'>
            <Rating  initialValue={initialValue} 
                allowHalfIcon={true} size={20} readonly={true} showTooltip={true} tooltipDefaultText={0}
                tooltipClassName={'bg-white text-dark'}/>
        </div>
    </div>
  )
}

