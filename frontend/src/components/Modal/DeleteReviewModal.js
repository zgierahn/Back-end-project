import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkDeleteReview } from "../../store/reviewsReducer";
import './ReviewModal.css'
import './DeleteModal.css'

function DeleteReviewModal({review}) {
    console.log('areyou here?', review);
const dispatch = useDispatch();

const { closeModal } = useModal();

//Delete Review Modal
return (
        <div>

            <button className='reserve-button'
            onClick={()=>{}}
            >Delete Modal</button>
            <div className='review-modal'>
                <div className='overlay'></div>
                <div className='review-content'>
                    <h1>Confirm Delete</h1>
                    <p>Are you sure you want to delete this review?</p>
                    <button className='confirm-delete-button' key={review.id}
                        onClick={()=>{dispatch(thunkDeleteReview(review.id))
                        .then(closeModal())}}>
                            Yes (Delete Review)
                    </button>
                    <button onClick={()=>{closeModal()}} className='close-delete-modal'>No (Keep Review)</button>
                </div>
            </div>



        </div>


  )
};

export default DeleteReviewModal;
