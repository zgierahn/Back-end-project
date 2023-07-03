// import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetSpots } from '../../store/spotsReducer';


export default function GetAllSpots() {

    const dispatch = useDispatch();

useEffect(() => {
    dispatch(thunkGetSpots())
}, [dispatch]);

const spotsObj = useSelector(state => state.spots.allSpots);

const spotsArray = Object.values(spotsObj);

    return (
        <div>
            <div>GetAllSpots</div>
            {spotsArray.map(spot =>{
                 return<p>{spot.address}</p>
            })}
        </div>
  )
};
