import React, { useState } from 'react';
import "./ReviewModal.css";


function ReviewModal() {
const [modal, setModal] = useState(false);

const toggleReviewButton = () => {
    setModal(!modal)
}

if(modal) document.body.classList.add('active-modl')
if(!modal) document.body.classList.remove('active-modl')

  return (
        <div>

            <button className='review-button'
            onClick={()=>{toggleReviewButton()}}
            >Create Review</button>

        {modal && (
            <div className='review-modal'>
            <div className='overlay'></div>
            <div className='review-content'>
                <h2>testing</h2>
                <p>This is where you put your form creation</p>
                <button onClick={()=>{toggleReviewButton()}} className='close-review-modal'>close</button>
            </div>

            </div>

         )}

        </div>


  )
};

export default ReviewModal
