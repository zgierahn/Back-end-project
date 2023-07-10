// import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetSingleSpot } from '../../store/spotsReducer';
import { useParams } from 'react-router-dom';
import { thunkDeleteReview, thunkGetReviewsBySpot } from '../../store/reviewsReducer';
import ReviewModal from '../Modal/ReviewModal';
import ReserveModal from '../Modal/ReserveModal';
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
const userObj = useSelector(state=>state.session.user)
console.log('what is in SpotsObject', spotsObj);

const reviewsArray = Object.values(reviewsObj);
let newestReviewsFirst = reviewsArray.reverse();
console.log('reviews array', reviewsArray);

if(!Object.values(spotsObj).length) { return null }


let imgArray = []
if(spotsObj.SpotImages) {
    imgArray = Object.values(spotsObj.SpotImages);
}


const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

    return (
        <div>
        <div>
            <h1>{spotsObj.name}</h1>
            <span><h3>{spotsObj.city}, {spotsObj.state}, {spotsObj.country}</h3></span>
            <div className='spot-details-images-container'>
                <img className= 'spot-details-previewImage' src={imgArray[0] ? imgArray[0].url : "https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg"} alt='no image'/>
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
                        <div className='mini-reviews-showing-span'>
                            <i className="fa fa-star"></i>
                            {spotsObj.avgRating ? spotsObj.avgRating.toFixed(1) : 'New'}
                            {!!newestReviewsFirst.length && <p className='thisminiperiod'>.</p>}
                            {newestReviewsFirst.length >= 1 && <p>{newestReviewsFirst.length} {newestReviewsFirst.length === 1 ? "Review" : "Reviews"}</p>}
                        </div>
                    </div>
                    <button className="single-spot-reserve-button" onClick={()=>{alert("Feature Coming Soon")}}>Reserve</button>
                </div>
            </div>
        </div>
        <hr></hr>
        <div className='single-spot-reviews-container'>
            <span className='h3-reviews-span'>
            <h3>
                <i className="fa fa-star"></i>
                {spotsObj.avgRating ? spotsObj.avgRating.toFixed(1) : 'New'}
            </h3>
            {!!newestReviewsFirst.length && <h3 className='thisperiod'>.</h3>}
            {newestReviewsFirst.length >= 1 && <h3>{newestReviewsFirst.length} {newestReviewsFirst.length === 1 ? "Review" : "Reviews"}</h3>}
            </span>

            {userObj !== null && userObj.id !== spotsObj.ownerId && ((reviewsArray.every((review)=>{return review.userId !== userObj.id}))) && <ReviewModal />}

            {!!!reviewsArray.length && !!userObj && userObj.id !== spotsObj.ownerId && <p>"Be the first to post a review!"</p>}
            {newestReviewsFirst.map(review=>{
                return (<div key={review.id} className='reviews-container'>
                    <p>{review.User.firstName !== undefined ? review.User.firstName : ''}</p>
                    <p>{month[new Date(review.createdAt).getMonth()]} {review.createdAt.split('-')[0]}</p>
                    <p>{review.review !== undefined ? review.review : ''}</p>
                    <button
                    onClick={()=>{dispatch(thunkDeleteReview(review.id))}}
                    >Delete Review</button>
                    <button>Add Review Image</button>
                </div>
            )})}
            </div>
        </div>
)};
