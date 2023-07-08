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
        <main className='main-body-container'>
            {spotsArray.map(spot =>{
                 return (
                     <div key={spot.id}
                     className='card-container tooltip'
                     onClick={()=>{history.push(`/spots/${spot.id}`)}}
                     >
                    <span className='tooltiptext'>{spot.name}</span>
                    <img className= 'previewImage' src={spot.previewImage ? spot.previewImage : "https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg"} alt='no image'/>
                    <span className='location-rating-span'>
                        <p className='city-state'>{spot.city}, {spot.state}</p>
                        <p className='avg-rating-main'>
                            <i className="fa fa-star"></i>
                            {spot.avgRating.toFixed(1)}
                        </p>
                    </span>
                     <p>${spot.price} night</p>

                 </div>)
            })}
        </main>
  )
};


{/* <i class="fa-regular fa-star"></i> */}
// xmlns="http://www.w3.org/2000/svg"
