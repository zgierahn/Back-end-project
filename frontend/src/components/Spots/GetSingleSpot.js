// import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetSingleSpot } from '../../store/spotsReducer';
import { useParams } from 'react-router-dom';

//works
export default function GetSingleSpot() {
    const dispatch = useDispatch();
    const { spotId } = useParams()

useEffect(() => {
    dispatch(thunkGetSingleSpot(spotId))
}, [dispatch]);

const spotsObj = useSelector(state => state.spots.singleSpot);
console.log('spotsObj', spotsObj);

if(!Object.values(spotsObj).length) { return null }

let imgArray = Object.values(spotsObj.SpotImages);
let url = imgArray[0].url;
console.log('this is the url', url);
console.log('img array', imgArray);

    return (
        <div>
            <h1>{spotsObj.name}</h1>
            <span><p>{spotsObj.city}, {spotsObj.state}, {spotsObj.country}</p></span>
            <img className= 'previewImage' src={url ? url : "https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg"} alt='no image'/>
        </div>
  )
};
