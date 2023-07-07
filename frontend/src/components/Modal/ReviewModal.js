import React, { useState, useEffect } from 'react';
import { thunkCreateReview } from '../../store/reviewsReducer';
import "./ReviewModal.css";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function ReviewModal() {
const { spotId } = useParams();
const dispatch = useDispatch();
const [modal, setModal] = useState(false);
const [reviewInfo, setReviewInfo] = useState('');
const [errors, setErrors] = useState({});
const [stars, setStars] = useState(0);
const [activeRating, setActiveRating] = useState(stars);


const toggleReviewButton = () => {
    setModal(!modal)
}

if(modal) document.body.classList.add('active-modl')
if(!modal) document.body.classList.remove('active-modl')

useEffect(() => {
let trackErrors = {};
setErrors({});
if(reviewInfo.length < 10) trackErrors.reviewInfo = 'Must leave a comment of 10 characters or more'
if(!stars) trackErrors.stars = 'Must rate this review';
setErrors(trackErrors);

}, [reviewInfo, stars])

const submitReview = async () => {
    let review = { reviewInfo, stars, spotId }
      await dispatch(thunkCreateReview(review, spotId));

    }

  return (
        <div>

            <button className='review-button'
            onClick={()=>{toggleReviewButton()}}
            >Create Review</button>

        {modal && (
            <div className='review-modal'>
            <div className='overlay'></div>
            <div className='review-content'>
                <h2>How was your Stay?</h2>
                <label>
                    Description:
                    <textarea
                    value={reviewInfo}
                    onChange={(e) => setReviewInfo(e.target.value)}
                    />
                </label>
                {errors.reviewInfo && <div className="errors">{errors.reviewInfo}</div>}
                <div className="star-rating">
                    <div
                        className={activeRating >= 1 ? "filled" : "empty"}
                        onMouseEnter={() => {setActiveRating(1)} }
                        onMouseLeave={() => {setActiveRating(stars)} }
                        onClick={() => {setStars(1)} }
                    >
                        <i className="fa fa-star"></i>
                    </div>
                    <div
                        className={activeRating >= 2 ? "filled" : "empty"}
                        onMouseEnter={() => {setActiveRating(2)} }
                        onMouseLeave={() => {setActiveRating(stars)} }
                        onClick={() => {setStars(2)} }
                    >
                        <i className="fa fa-star"></i>
                    </div>
                    <div
                        className={activeRating >= 3 ? "filled" : "empty"}
                        onMouseEnter={() => {setActiveRating(3)} }
                        onMouseLeave={() => {setActiveRating(stars)} }
                        onClick={() => {setStars(3)} }
                    >
                        <i className="fa fa-star"></i>
                    </div>
                    <div
                        className={activeRating >= 4 ? "filled" : "empty"}
                        onMouseEnter={() => {setActiveRating(4)} }
                        onMouseLeave={() => {setActiveRating(stars)} }
                        onClick={() => {setStars(4)} }
                    >
                        <i className="fa fa-star"></i>
                    </div>
                    <div
                        className={activeRating >= 5 ? "filled" : "empty"}
                        onMouseEnter={() => {setActiveRating(5)} }
                        onMouseLeave={() => {setActiveRating(stars)} }
                        onClick={() => {setStars(5)} }
                    >
                        <i className="fa fa-star"></i>
                    </div>

                </div>
                {errors.stars && <div className="errors">{errors.stars}</div>}
                <button  className='submit-review-button'>Submit Review</button>
                <button onClick={()=>{toggleReviewButton()}} className='close-review-modal'>Cancel</button>
            </div>

            </div>

         )}

        </div>


  )
};

export default ReviewModal
