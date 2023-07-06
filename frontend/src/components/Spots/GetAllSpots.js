import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkDeleteSpot, thunkGetSpots } from '../../store/spotsReducer';


export default function GetAllSpots() {

    const dispatch = useDispatch();

useEffect(() => {
    dispatch(thunkGetSpots())
}, [dispatch]);

const spotsObj = useSelector(state => state.spots.allSpots);
const spotsArray = Object.values(spotsObj);
console.log('spotsarray', spotsArray);
console.log('get all spots rendered');

    return (
        <div>
            <h1>GetAllSpots</h1>
            {spotsArray.map(spot =>{
                 return (  <div>
                    <img className= 'previewImage' src={spot.previewImage ? spot.previewImage : "https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg"} alt='no image'/>
                     <p key={spot.city}>{spot.city}</p>
                     <p key={spot.state}>{spot.state}</p>
                     <p>Price: {spot.price}</p>
                 </div>)
            })}
        </div>
  )
};
