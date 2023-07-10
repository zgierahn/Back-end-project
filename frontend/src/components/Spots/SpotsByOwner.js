import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkDeleteSpot, thunkGetUserSpots } from '../../store/spotsReducer';
import { useHistory } from 'react-router-dom';
import DeleteModalButton from '../Modal/DifDeleteModal';
import DeleteModal from '../Modal/DeleteModal';


function SpotsByOwner() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetUserSpots())
    }, [dispatch]);

    const spotsObj = useSelector(state => state.spots.allSpots);
    const spotsArray = Object.values(spotsObj);


  return (
    <div>
    <h1>Manage your Spots</h1>
    <button className='the-stupid-extra-button' onClick={()=>{history.push('/spots/new')}}>Create a New Spot</button>
    <div className='manage-spots-container'>
    {spotsArray.map(spot =>{
         return (
          <div className='outer-card-container'>
         <div key={spot.id}
          className='card-container'
          onClick={()=>{history.push(`/spots/${spot.id}`)}}
          data-tooltip={spot.name}
          >
            <img className= 'previewImage' src={spot.previewImage ? spot.previewImage : "https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg"} alt='no image'/>
            <span className='location-rating-span'>
                <p className='city-state'>{spot.city}, {spot.state}</p>
                <p className='avg-rating-main'>
                    <i className="fa fa-star"></i>
                    {spot.avgRating ? spot.avgRating.toFixed(1) : 'New'}
                </p>
                <p>${spot.price} night</p>
            </span>
            <div>
              </div>
              </div>
              <DeleteModalButton modalComponent={<DeleteModal spot={spot}/>} buttonText={"Delete"}/>
            <button onClick={(e)=>history.push(`/spots/${spot.id}/edit`)}>Update</button>



          </div>)
    })}
    </div>
  </div>
  )
}

export default SpotsByOwner
