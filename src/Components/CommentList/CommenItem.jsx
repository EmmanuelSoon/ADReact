import {React, useState} from 'react'
import RatingResult from '../StarRating/RatingResult'
export default function CommenItem(props) {

    const {comment} = props
    return (
        <div className='mt-3'>
            <div className='row'>
                <div className='col-12'>
                    <i className="fa fa-user" aria-hidden="true"></i> {comment.user.name} | <span className='text-secondary'>{comment.time}</span>
                </div>
            </div>
            <RatingResult initialValue={comment.rating}/>
            <div className='row border-bottom'>
                <div className='col-12'>
                    {comment.content}
                </div>
            </div>
        </div>
    )
}
