import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkDeleteSpot, thunkGetUserSpots } from '../../store/spotsReducer';
import { useHistory } from 'react-router-dom';


function SpotsByOwner() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetUserSpots())
    }, [dispatch]);

    const spotsObj = useSelector(state => state.spots.allSpots);
    const spotsArray = Object.values(spotsObj);
    console.log('spotsarray', spotsArray);

  return (
    <div>
    <h1>Manage your Spots</h1>
    {spotsArray.map(spot =>{
         return (  <div>
            <img className= 'previewImage' src={spot.previewImage ? spot.previewImage : "https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg"} alt='no image'/>
             <p key={spot.city}>{spot.city}</p>
             <p key={spot.state}>{spot.state}</p>
             <p>Price: {spot.price}</p>
         <button key={spot.id} onClick={(e)=>{
                e.preventDefault();
                return dispatch(thunkDeleteSpot(spot.id))
            }}>Delete</button>
            <button onClick={(e)=>history.push(`/spots/${spot.id}/edit`)}>Update</button>
         </div>)
    })}
    </div>
  )
}

export default SpotsByOwner
