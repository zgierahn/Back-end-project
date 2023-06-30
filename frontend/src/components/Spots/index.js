// import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetSpots } from '../../store/spotsReducer';


export default function GetAllSpots() {

    const dispatch = useDispatch();

useEffect(() => {
    dispatch(thunkGetSpots())
}, [dispatch]);

const spotsObj = useSelector(state => state.spots);

const spotsArray = Object.values(spotsObj);
console.log('show me the money', spotsArray);

    return (
        <div>
            <div>GetAllSpots</div>
            {/* {spotsArray.map(spot =>{
                 return<div>{spot}</div>
            })} */}
        </div>
  )
};
