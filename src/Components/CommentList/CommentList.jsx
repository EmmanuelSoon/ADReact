import React from 'react'
import CommenItem from './CommenItem'
import { Rating } from 'react-simple-star-rating'
export default function CommentList(props) {
  const {comments} = props
  
  const totalCount = comments.length
  const averageRating = ((comments.reduce((prev, curr) => prev + curr.rating, 0))/totalCount).toFixed(1)
  const commentsList = () => {
      if (totalCount > 0) {
        return comments.map((comment, index)=> <CommenItem key={index} comment={comment}/>)
      }
    }
  const summaryInfo = () => {
    if (totalCount > 0) {
      const summary = `${averageRating} (${totalCount} reviews)`;
      return (
      <div className='row mb-4 border-bottom'>
        <div className='col-12 mb-4'>
         <Rating  initialValue={averageRating}  allowHalfIcon={true} size={22} readonly={true} tooltipArray={[summary]}
                  showTooltip={true} tooltipClassName={'bg-white text-dark'} tooltipDefaultText={summary}/>
        </div>
      </div>
      )
    }
    else {
      return (
        <div className='row mb-4'>
          <div className='col-12 mb-4'>
            There is no reviews yet!
          </div>
        </div>
      )
    }
    
  }
  return (
    <div>
      <h4>Recipe Ratings</h4>
      {summaryInfo()}
      {commentsList()}
      
    </div>
  )
}
