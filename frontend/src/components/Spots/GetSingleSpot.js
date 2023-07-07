// import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetSingleSpot } from '../../store/spotsReducer';
import { useParams } from 'react-router-dom';
import { thunkDeleteReview, thunkGetReviewsBySpot } from '../../store/reviewsReducer';
import ReviewModal from '../Modal/ReviewModal';

//works
export default function GetSingleSpot() {
    const dispatch = useDispatch();
    const { spotId } = useParams()

useEffect(() => {
    const stringFunc = async() => {
    await  dispatch(thunkGetSingleSpot(spotId))
    await dispatch(thunkGetReviewsBySpot(spotId))
    }
    stringFunc();
}, [dispatch]);

const spotsObj = useSelector(state => state.spots.singleSpot);
const reviewsObj = useSelector(state=>state.reviews.spot);


const reviewsArray = Object.values(reviewsObj);
console.log('reviews array', reviewsObj);

if(!Object.values(spotsObj).length) { return null }
// !Object.values(reviewsObj).length

let imgArray = Object.values(spotsObj.SpotImages);
let url = imgArray[0].url;


    return (
        <div>
        <div>
            <h1>{spotsObj.name}</h1>
            <span><p>{spotsObj.city}, {spotsObj.state}, {spotsObj.country}</p></span>
            <img className= 'previewImage' src={url ? url : "https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg"} alt='no image'/>
            <ReviewModal />
        </div>
        {reviewsArray.map(review=>{
            return (<div key={review.id} className='reviews-container'>
                <p>{review.User.firstName !== undefined ? review.User.firstName : ''}</p>
                <p>{review.createdAt !== undefined  ? review.createdAt : ''}</p>
                <p>{review.review !== undefined ? review.review : ''}</p>
                <button
                    onClick={()=>{dispatch(thunkDeleteReview(review.id))}}
                     >Delete Review</button>
                     <button>Add Review Image</button>
            </div>
        )})}
        <div>
        </div>
        </div>
  )
};
