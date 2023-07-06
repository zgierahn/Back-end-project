import React, { useState, useEffect } from 'react';
import "./ReviewModal.css";


function ReviewModal() {
const [modal, setModal] = useState(false);
const [reviewInfo, setReviewInfo] = useState('');
const [errors, setErrors] = useState({});
const [stars, setStars] = useState(0)

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
                <button onClick={()=>{toggleReviewButton()}} className='close-review-modal'>close</button>
            </div>

            </div>

         )}

        </div>


  )
};

export default ReviewModal
