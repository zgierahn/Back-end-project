// import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetSingleSpot } from '../../store/spotsReducer';
import { useParams } from 'react-router-dom';
import { thunkDeleteReview, thunkGetReviewsBySpot } from '../../store/reviewsReducer';
import ReviewModal from '../Modal/ReviewModal';
import './GetSingleSpot.css';

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
console.log('spots object', spotsObj);

if(!Object.values(spotsObj).length) { return null }

let imgArray = Object.values(spotsObj.SpotImages);
console.log('what does this look like', imgArray);



    return (
        <div>
        <div>
            <h1>{spotsObj.name}</h1>
            <span><h3>{spotsObj.city}, {spotsObj.state}, {spotsObj.country}</h3></span>
            <div className='spot-details-images-container'>
                <img className= 'spot-details-previewImage' src={imgArray[0].url ? imgArray[0].url : "https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg"} alt='no image'/>
                <span className='spot-details-small-pic-container'>
                    <img className= 'spot-details-small-images' src={imgArray[1] ? imgArray[1].url : "https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg"} alt='no image'/>
                    <img className= 'spot-details-small-images' src={imgArray[2] ? imgArray[2].url : "https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg"} alt='no image'/>
                    <img className= 'spot-details-small-images' src={imgArray[3] ? imgArray[3].url : "https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg"} alt='no image'/>
                    <img className= 'spot-details-small-images' src={imgArray[4] ? imgArray[4].url : "https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg"} alt='no image'/>
                </span>
            </div>
            <div className='spot-detail-information-container'>
                <span className='hosting-container'>
                    <h1>Hosted by: {spotsObj.Owner.firstName}, {spotsObj.Owner.lastName}</h1>
                    <p>{spotsObj.description}</p>
                </span>
                <div className='reserve-container'>
                    <div className='price-rating-container'>
                        <p>${spotsObj.price} night</p>
                        <div>
                            <i className="fa fa-star"></i>
                            {spotsObj.avgRating ? spotsObj.avgRating.toFixed(1) : 'New'}
                        </div>
                    </div>
                    <button>Reserve</button>
                </div>
            </div>
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
