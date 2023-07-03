// import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetSingleSpot } from '../../store/spotsReducer';
import { useParams } from 'react-router-dom';


export default function GetSingleSpot() {
    const dispatch = useDispatch();
    const { spotId } = useParams()

useEffect(() => {
    dispatch(thunkGetSingleSpot(spotId))
}, [dispatch]);

const spotsObj = useSelector(state => state.spots.singleSpot);

console.log('this is my object', spotsObj);

    return (
        <div>
            <div>Get Single Spot</div>
            <span><p>Owner Id:</p><p>{spotsObj.ownerId}</p></span>
            <span><p>Address:</p><p>{spotsObj.address}</p></span>

        </div>
  )
};
