import React from 'react'
import ReactStars from "react-rating-stars-component";
import shoe7 from "../../images/shoe7.jpg"
import "./reviewCard.css";
const ReviewCard = ({review}) => {
    const options = {
		edit:false,
		color:"rgba(20, 20, 20, 0.1)",
		activeColor:"gold",
		value:review.rating,
		// value:3,
        size:16,
		isHalf:true,
	}

  return (
    <div className='reviewCard'>
        <div>
            <img src={shoe7} alt="User"/>
            <div>
                <p>{review.name}</p>
                <ReactStars {...options} /> 
            </div>
        </div>
        <span>{review.comment}</span>   
    </div>
  )
}

export default ReviewCard
