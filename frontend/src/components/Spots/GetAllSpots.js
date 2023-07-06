import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkDeleteSpot, thunkGetSpots } from '../../store/spotsReducer';
import { useHistory } from 'react-router-dom';
import './GetAllSpots.css';


export default function GetAllSpots() {
    const history = useHistory();
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
            {spotsArray.map(spot =>{
                 return (
                 <div
                    className='card-container'
                    onClick={()=>{history.push(`/spots/${spot.id}`)}}
                 >
                    <img className= 'previewImage' src={spot.previewImage ? spot.previewImage : "https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg"} alt='no image'/>
                     <p key={spot.city}>{spot.city}</p>
                     <p key={spot.state}>{spot.state}</p>
                     <p>Price: {spot.price}</p>
                 </div>)
            })}
        </div>
  )
};


{/* <i class="fa-regular fa-star"></i> */}
