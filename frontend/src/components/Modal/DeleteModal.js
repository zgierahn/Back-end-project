import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import './ReviewModal.css'
import { thunkDeleteSpot } from "../../store/spotsReducer"
import './DeleteModal.css'

function DeleteModal({spot}) {
const dispatch = useDispatch();

const { closeModal } = useModal();


return (
        <div>

            <button className='reserve-button'
            onClick={()=>{}}
            >Delete Modal</button>
            <div className='review-modal'>
                <div className='overlay'></div>
                <div className='review-content'>
                    <h1>Confirm Delete</h1>
                    <p>Are you sure you want to remove this spot from the listings?</p>
                    <button className='confirm-delete-button' key={spot.id}
                        onClick={(e)=>{e.preventDefault();
                        dispatch(thunkDeleteSpot(spot.id))
                        .then(closeModal())}}>
                            Yes (Delete Spot)
                    </button>
                    <button onClick={()=>{closeModal()}} className='close-delete-modal'>No (Keep Spot)</button>

                </div>
            </div>



        </div>


  )
};

export default DeleteModal;
